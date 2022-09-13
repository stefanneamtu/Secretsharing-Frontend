import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CountdownTimer from "./CountdownTimer";
import ShareBid from "./ShareBid";

function BiddingPage({
  activeTimeLocks,
  currentBids,
  biddingOver,
  biddingHasFinished,
  user,
  contract,
}) {
  console.log("Current Bids:", currentBids);

  return (
    <Container>
      <Box style={{ marginTop: "85px", width: "100%" }}>
        {Object.keys(activeTimeLocks)
          .slice(0)
          .filter((elem) => typeof biddingOver[elem] == "undefined")
          .reverse()
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
                    <CountdownTimer
                      targetDate={activeTimeLocks[activeTimeLock].biddingTime}
                      callback={biddingHasFinished}
                      ipfsCid={activeTimeLock}
                    />
                  </Grid>
                </Grid>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="h6"> {activeTimeLock} </Typography>
                <Grid container>
                  {(() => {
                    let shares = [];
                    for (
                      let i = 0;
                      i < activeTimeLocks[activeTimeLock].keyAmount;
                      ++i
                    ) {
                      shares.push(
                        <Grid item xs={12} md={6} lg={4}>
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
                    return shares;
                  })()}
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
      </Box>
    </Container>
  );
}

export default BiddingPage;
