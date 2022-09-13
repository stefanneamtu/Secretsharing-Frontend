import React, { useEffect, useState } from "react";
import { CssBaseline } from "@mui/material";
import NavBar from "./components/NavBar";
import Web3 from "web3";
import { TimeLockContractABI, TimeLockContractAddress } from "./abi";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import OwnedFiles from "./components/OwnedFiles";
import BiddingPage from "./components/BiddingPage";
import DashBoard from "./components/DashBoard";

const web3 = new Web3(Web3.givenProvider);

const contract = new web3.eth.Contract(
  TimeLockContractABI,
  TimeLockContractAddress
);

async function metaMask({ setUser }) {
  // noinspection JSUnresolvedVariable
  if (!window.ethereum) {
    alert("You need to have MetaMask installed!");
    return;
  }

  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  setUser(accounts[0]);
}

function App() {
  const [user, setUser] = useState("");

  const [activeTimeLocks, setActiveTimeLocks] = useState({});
  const [activeTimeLocksDetails, setActiveTimeLocksDetails] = useState({});

  const [currentBids, setCurrentBids] = useState({});

  const [activeContributions, setActiveContributions] = useState([]);
  const [activeContributionsSecretShare, setActiveContributionsSecretShare] =
    useState({});

  const [timeLockOver, setTimeLockOver] = useState({});
  const [biddingOver, setBiddingOver] = useState({});

  function timeLockHasFinished(ipfsCid) {
    if (typeof timeLockOver[ipfsCid] == "undefined") {
      console.log("Time-lock over:", ipfsCid);
      setTimeLockOver((prevState) => {
        return {
          ...prevState,
          [ipfsCid]: true,
        };
      });
    }
  }

  function biddingHasFinished(ipfsCid) {
    if (typeof biddingOver[ipfsCid] == "undefined") {
      setBiddingOver((prevState) => {
        return {
          ...prevState,
          [ipfsCid]: true,
        };
      });
    }
  }

  useEffect(() => {
    metaMask({ setUser }).then(() => {
      contract.events.NewTimeLock({ fromBlock: 0 }, function (error, event) {
        if (error) {
          alert("Error occurred - NewTimeLock");
        } else {
          const ipfsCid = event.returnValues.ipfsHash;
          const fileName = event.returnValues.fileName;
          const fileOwner = event.returnValues.owner;
          const keyAmount = event.returnValues.totalAmount;
          const unlockTime = new Date(
            event.returnValues.unlockTime * 1000
          ).getTime();
          const biddingTime = new Date(
            event.returnValues.biddingTime * 1000
          ).getTime();
          //if (biddingTime < new Date().getTime()) {
          //  return;
          //}
          if (ipfsCid) {
            setActiveTimeLocks((prevState) => {
              if (Object.keys(prevState).find((elem) => elem === ipfsCid)) {
                return prevState;
              }
              setActiveTimeLocksDetails((prevState) => {
                return { ...prevState, [ipfsCid]: [] };
              });
              setCurrentBids((prevState) => {
                return { ...prevState, [ipfsCid]: [] };
              });
              return {
                ...prevState,
                [ipfsCid]: {
                  fileOwner,
                  fileName,
                  unlockTime,
                  keyAmount,
                  biddingTime,
                },
              };
            });
          }
        }
      });
    });

    Object.keys(activeTimeLocks).forEach(async (ipfsCid) => {
      for (let i = 0; i < activeTimeLocks[ipfsCid].keyAmount; ++i) {
        const bidAmount = await contract.methods
          .getCollateral(ipfsCid, i)
          .call();
        const bidAmountInEth = web3.utils.fromWei(bidAmount);
        const bids = currentBids[ipfsCid];

        if (bidAmountInEth === bids[i]) {
          continue;
        }
        bids[i] = bidAmountInEth;

        setCurrentBids((prevState) => {
          return {
            ...prevState,
            [ipfsCid]: bids,
          };
        });
      }

      if (
        activeTimeLocksDetails[ipfsCid].find(
          (elem) => elem.holder.toLowerCase() === user.toLowerCase()
        )
      ) {
        setActiveContributions((prevState) => {
          if (prevState.find((elem) => elem === ipfsCid)) {
            return prevState;
          }
          contract.methods
            .getSecret(ipfsCid)
            .call({ from: user })
            .then((value) => {
              setActiveContributionsSecretShare((prevState) => {
                return { ...prevState, [ipfsCid]: [value] };
              });
            });
          return [...prevState, ipfsCid];
        });
      }
    });

    contract.events.NewEncrypted({ fromBlock: 0 }, function (error, event) {
      if (error) {
        alert("Error occurred - NewEncrypted");
      } else {
        const ipfsCid = event.returnValues.ipfsHash;
        const secretShare = event.returnValues.secretShare;
        const holder = event.returnValues.holder;
        setActiveTimeLocksDetails((prevState) => {
          const temp = prevState[ipfsCid];
          if (
            typeof temp === "undefined" ||
            temp.find((elem) => elem.holder === holder)
          ) {
            return prevState;
          }
          return {
            ...prevState,
            [ipfsCid]: [...temp, { holder, secretShare }],
          };
        });
      }
    });

    contract.events.NewHigherBid(
      { fromBlock: "latest" },
      function (error, event) {
        if (error) {
          alert("Error occurred - NewHigherBid");
        } else {
          const ipfsCid = event.returnValues.ipfsHash;
          const shareIndex = parseInt(event.returnValues.shareIndex);
          const bidAmount = event.returnValues.amount;

          const bids = currentBids[ipfsCid];
          if (typeof bids == "undefined") {
            return;
          }

          bids[shareIndex] = web3.utils.fromWei(bidAmount);
          setCurrentBids((prevState) => {
            return {
              ...prevState,
              [ipfsCid]: bids,
            };
          });
        }
      }
    );
  }, [activeTimeLocks, activeTimeLocksDetails, currentBids, user]);

  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <NavBar
          user={user}
          contract={contract}
          callback={() => metaMask({ setUser })}
        />
        <Routes>
          <Route
            path="/"
            element={
              <DashBoard
                activeTimeLocks={activeTimeLocks}
                activeTimeLocksDetails={activeTimeLocksDetails}
                user={user}
                contract={contract}
              />
            }
          />
          <Route
            path="/timelocks"
            element={
              <OwnedFiles
                user={user}
                activeTimeLocks={activeTimeLocks}
                activeTimeLocksDetails={activeTimeLocksDetails}
                timeLockOver={timeLockOver}
                biddingOver={biddingOver}
                timeLockHasFinished={timeLockHasFinished}
                biddingHasFinished={biddingHasFinished}
                activeContributions={activeContributions}
                activeContributionsSecretShare={activeContributionsSecretShare}
                currentBids={currentBids}
                contract={contract}
              />
            }
          />
          <Route
            path="/bid"
            element={
              <BiddingPage
                activeTimeLocks={activeTimeLocks}
                biddingHasFinished={biddingHasFinished}
                biddingOver={biddingOver}
                currentBids={currentBids}
                user={user}
                contract={contract}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
