import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NewTimeLockForm from "./NewTimeLockForm";
import CountdownTimer from "./CountdownTimer";
import ShareBid from "./ShareBid";
import SecretShareUpload from "./SecretShareUpload";

function OwnedFiles({
  user,
  activeTimeLocks,
  activeTimeLocksDetails,
  timeLockOver,
  biddingOver,
  timeLockHasFinished,
  biddingHasFinished,
  activeContributions,
  activeContributionsSecretShare,
  contract,
  currentBids,
}) {
  const [decryptedShare, setDecryptedShare] = useState("");

  function submitHandler({ elem }) {
    contract.methods.submitDecrypted(elem, decryptedShare).send({ from: user });
    setDecryptedShare("");
  }

  console.log("elems:", activeContributionsSecretShare);
  console.log("elem", activeContributionsSecretShare);

  return (
    <Container>
      <Box style={{ marginTop: "85px", width: "100%" }}>
        <NewTimeLockForm contract={contract} user={user} />
        <Typography variant="h4">Your Time-locks</Typography>
        {Object.keys(activeTimeLocks)
          .slice(0)
          .reverse()
          .filter(
            (elem) =>
              activeTimeLocks[elem].fileOwner.toLowerCase() ===
              user.toLowerCase()
          )
          .map((activeTimeLock, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="h6">
                      {" "}
                      {activeTimeLocks[activeTimeLock].fileName}{" "}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ textAlign: "right" }}>
                    {typeof biddingOver[activeTimeLock] != "undefined" ? (
                      <CountdownTimer
                        targetDate={activeTimeLocks[activeTimeLock].unlockTime}
                        callback={timeLockHasFinished}
                        ipfsCid={activeTimeLock}
                      />
                    ) : (
                      <CountdownTimer
                        targetDate={activeTimeLocks[activeTimeLock].biddingTime}
                        callback={biddingHasFinished}
                        ipfsCid={activeTimeLock}
                      />
                    )}
                  </Grid>
                </Grid>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="h6"> {activeTimeLock} </Typography>
                {activeTimeLocksDetails[activeTimeLock].map((entry, index) => {
                  if (
                    timeLockOver[activeTimeLock] &&
                    typeof timeLockOver[activeTimeLock] != "undefined"
                  ) {
                    return (
                      <Box key={index}>
                        <Typography gutterBottom variant="h6">
                          {" "}
                          {entry.holder}{" "}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="h6"
                          style={{ wordWrap: "break-word" }}
                        >
                          {JSON.stringify(
                            Buffer.from(entry.secretShare, "latin1").toJSON()[
                              "data"
                            ]
                          )}
                        </Typography>
                      </Box>
                    );
                  }
                  return <> </>;
                })}
                {(() => {
                  if (typeof biddingOver[activeTimeLock] == "undefined") {
                    // The bidding is not over
                    let shares = [];
                    for (
                      let i = 0;
                      i < activeTimeLocks[activeTimeLock].keyAmount;
                      ++i
                    ) {
                      shares.push(
                        <Grid elem xs={12} md={6} lg={4}>
                          <ShareBid
                            ipfsHash={activeTimeLock}
                            bidIndex={i}
                            bidAmount={currentBids[activeTimeLock][i]}
                            contract={contract}
                            user={user}
                            key={i}
                          />
                        </Grid>
                      );
                    }
                    return <Grid container> {shares} </Grid>;
                  } else if (
                    typeof timeLockOver[activeTimeLock] == "undefined"
                  ) {
                    // The time-lock is not over
                    return (
                      <>
                        <Typography variant="h6">
                          {" "}
                          Time-lock not over{" "}
                        </Typography>
                        <SecretShareUpload
                          ipfsCid={activeTimeLock}
                          contract={contract}
                          user={user}
                        />
                      </>
                    );
                  } else {
                    // Time-lock is over
                    return (
                      <>
                        {/*<Typography variant="h6"> Time-lock over </Typography>
                        <SecretShareAssignment
                          ipfsCid={activeTimeLock}
                          contract={contract}
                          user={user}
                        />
                        */}
                      </>
                    );
                  }
                })()}
              </AccordionDetails>
            </Accordion>
          ))}
        <Typography variant="h4">Your Contributions</Typography>
        {activeContributions.map((elem, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Grid container>
                <Grid item xs={6}>
                  <Typography variant="h6">
                    {" "}
                    {activeTimeLocks[elem].fileName}{" "}
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: "right" }}>
                  <CountdownTimer
                    targetDate={activeTimeLocks[elem].unlockTime}
                    callback={biddingHasFinished}
                    ipfsCid={elem}
                  />
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Typography gutterBottom variant="h6">
                IPFS Cid: {elem}
              </Typography>
              {activeContributionsSecretShare[elem] ? (
                <Typography
                  gutterBottom
                  variant="h6"
                  style={{ wordWrap: "break-word" }}
                >
                  Bytes:
                  {JSON.stringify(
                    Buffer.from(
                      activeContributionsSecretShare[elem][0],
                      "latin1"
                    ).toJSON()["data"]
                  )}
                </Typography>
              ) : (
                ""
              )}
              <Typography variant="h5">
                {" "}
                Submit your decrypted share:{" "}
              </Typography>
              <Grid container>
                <Grid elem>
                  <TextField
                    value={decryptedShare}
                    id="outlined-basic"
                    label="Decrypted Share"
                    variant="outlined"
                    onChange={(e) => setDecryptedShare(e.target.value)}
                  />
                </Grid>
                <Grid elem>
                  <Button
                    variant="contained"
                    onClick={() => submitHandler({ elem })}
                    style={{ minHeight: "100%", marginLeft: "10px" }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
}

export default OwnedFiles;
