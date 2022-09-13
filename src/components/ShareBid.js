import React, { useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider);

function ShareBid({ user, ipfsHash, bidIndex, bidAmount, contract }) {
  const [bid, setBid] = useState(0);

  function handleBidChange(event) {
    event.preventDefault();

    setBid(event.target.value);
  }

  async function handleBidSubmit(event) {
    event.preventDefault();

    await contract.methods
      .bidCollateral(ipfsHash, bidIndex)
      .send({ from: user, value: web3.utils.toWei(bid) });

    setBid(0);
  }

  return (
    <Box>
      <Typography variant="h6">
        {" "}
        Share {bidIndex + 1}: {bidAmount}{" "}
      </Typography>
      <Grid container>
        <Grid elem>
          <TextField
            value={bid}
            label="Bid"
            variant="outlined"
            onChange={handleBidChange}
          />
        </Grid>
        <Grid elem>
          <Button
            variant="contained"
            onClick={handleBidSubmit}
            style={{ minHeight: "100%", marginLeft: "10px" }}
          >
            Bid
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ShareBid;
