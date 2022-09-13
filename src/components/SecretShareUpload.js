import React, { useEffect, useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import crypto from "crypto";
import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider);

function SecretShareUpload({ ipfsCid, contract, user }) {
  const [secretShares, setSecretShares] = useState([]);
  const [bidders, setBidders] = useState([]);

  useEffect(() => {
    async function getBidders() {
      const _bidders = await contract.methods.getBidders(ipfsCid).call();
      setBidders(_bidders);
      setSecretShares(_bidders.map(() => ""));
    }

    getBidders().then();
  }, [contract, ipfsCid]);

  function handleTextFieldChange({ index, newSecretName }) {
    setSecretShares((prevState) => {
      let _secretShares = [...prevState];
      _secretShares[index] = newSecretName;
      return _secretShares;
    });
  }

  console.log("Bidders: ", bidders);
  console.log("Shares: ", secretShares);

  async function submitHandler() {
    const keccakChecks = secretShares.map((elem) => web3.utils.keccak256(elem));

    const encryptedSecretShares = await Promise.all(
      secretShares.map(async (elem, index) => {
        const shareHolderPublicKey = await contract.methods
          .getPublicKey(bidders[index])
          .call();

        // for testing
        if (!shareHolderPublicKey) {
          console.log("No key");
          return secretShares[index];
        }

        console.log("Key: ", shareHolderPublicKey);

        return crypto
          .publicEncrypt(
            shareHolderPublicKey,
            Buffer.from(secretShares[index], "latin1")
          )
          .toString("latin1");
      })
    );

    await contract.methods
      .submitEncryptedSecrets(ipfsCid, encryptedSecretShares, keccakChecks)
      .send({ from: user });
  }

  return (
    <Box>
      <Typography variant="h5"> Assign a new secret share: </Typography>
      <Grid container>
        {bidders.map((bidder, index) => {
          return (
            <Grid elem>
              <TextField
                key={index}
                value={secretShares[index] || ""}
                id="outlined-basic"
                label="Secret Share"
                variant="outlined"
                style={{ minHeight: "100%", marginRight: "10px" }}
                onChange={(e) =>
                  handleTextFieldChange({
                    index: index,
                    newSecretName: e.target.value,
                  })
                }
              />
            </Grid>
          );
        })}
        <Grid elem>
          <Button
            variant="contained"
            onClick={submitHandler}
            style={{ minHeight: "100%" }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SecretShareUpload;
