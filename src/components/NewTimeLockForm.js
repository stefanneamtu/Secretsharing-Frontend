import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Input,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { create } from "ipfs-http-client";
import useStyles from "../styles/styles";
import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider);

const ipfsClient = create("https://ipfs.infura.io:5001/api/v0");

function NewTimeLockForm({ contract, user }) {
  const classes = useStyles();

  const [ipfsCid, setIpfsCid] = useState("");
  const [ethReward, setEthReward] = useState(0);
  const [n, setN] = useState(1);
  const [k, setK] = useState(1);

  const [biddingDuration, setBiddingDuration] = useState(0);
  const [biddingUnit, setBiddingUnit] = useState("seconds");

  const [timeLockDuration, setTimeLockDuration] = useState(0);
  const [timeLockUnit, setTimeLockUnit] = useState("seconds");

  const [file, setFile] = useState(null);
  const [fileCids, setFileCids] = useState([]);

  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleFileNameChange({ setter, value }) {
    setter(value);
  }

  function getFile(event) {
    event.preventDefault();

    const data = event.target.files[0];
    const fileReader = new window.FileReader();
    fileReader.readAsArrayBuffer(data);
    fileReader.onloadend = function () {
      setFile(new Buffer(fileReader.result));
      console.log("Data has been buffered: ", new Buffer(fileReader.result));
    };
  }

  function getUnitMultiplier(unit) {
    let unitMultiplier;

    switch (unit) {
      case "minutes":
        unitMultiplier = 60;
        break;
      case "hours":
        unitMultiplier = 60 * 60;
        break;
      case "days":
        unitMultiplier = 24 * 60 * 60;
        break;
      case "weeks":
        unitMultiplier = 7 * 24 * 60 * 60;
        break;
      default:
        unitMultiplier = 1;
    }

    return unitMultiplier;
  }

  async function submitHandler(event) {
    event.preventDefault();

    const totalTimeLockInSeconds =
      getUnitMultiplier(timeLockUnit) * timeLockDuration;
    console.log("Total time-lock time: ", totalTimeLockInSeconds);

    const totalBiddingInSeconds =
      getUnitMultiplier(biddingUnit) * biddingDuration;
    console.log("Total bidding time: ", totalBiddingInSeconds);

    // add ipfs file
    try {
      const cid = await ipfsClient.add(file);
      const url = `https://ipfs.infura.io/ipfs/${cid.path}`;
      setFileCids((prevState) => [...prevState, url]);
      console.log("IPFS URL: ", url);

      //await contract.methods
      //  .timeLockNewFile(ipfsCid, n, k, totalTimeInSeconds)
      //  .send({ from: user });

      await contract.methods
        .timeLockNewFile(
          cid.path,
          ipfsCid,
          n,
          k,
          totalTimeLockInSeconds,
          totalBiddingInSeconds
        )
        .send({ from: user, value: web3.utils.toWei(ethReward) });
    } catch (error) {
      console.log("Error: ", error.message);
    }

    //setIpfsCid("");
    //setK(1);
    //setN(1);

    //setTimeAmount(0);
    //setTimeUnit("seconds");

    //setFile(null);
  }

  return (
    <>
      <Button variant="outlined" fullWidth onClick={handleOpen}>
        Submit new time-lock
      </Button>
      <Dialog
        open={open}
        className={classes.timeLockDialog}
        onClose={handleClose}
      >
        <DialogTitle> Submit a new time-lock </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={12}>
              <TextField
                value={ipfsCid}
                id="outlined-basic"
                label="File Name"
                variant="outlined"
                className={classes.textInputLarge}
                onChange={(e) =>
                  handleFileNameChange({
                    setter: setIpfsCid,
                    value: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item md={4}>
              <TextField
                value={n}
                id="outlined-basic"
                label="Maximum Keys"
                variant="outlined"
                className={classes.textInputSmall}
                onChange={(e) =>
                  handleFileNameChange({ setter: setN, value: e.target.value })
                }
              />
            </Grid>
            <Grid item md={4} sx={{ paddingLeft: "10px" }}>
              <TextField
                value={k}
                id="outlined-basic"
                label="Minimum Keys"
                variant="outlined"
                className={classes.textInputSmall}
                onChange={(e) =>
                  handleFileNameChange({ setter: setK, value: e.target.value })
                }
              />
            </Grid>
            <Grid item md={4} sx={{ paddingLeft: "10px" }}>
              <TextField
                value={ethReward}
                id="outlined-basic"
                label="Eth Reward"
                variant="outlined"
                className={classes.textInputSmall}
                onChange={(e) =>
                  handleFileNameChange({
                    setter: setEthReward,
                    value: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item md={8}>
              <TextField
                value={biddingDuration}
                id="outlined-basic"
                label="Bidding Duration"
                variant="outlined"
                className={classes.textInputSmall}
                onChange={(e) =>
                  handleFileNameChange({
                    setter: setBiddingDuration,
                    value: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item md={4} sx={{ paddingLeft: "10px" }}>
              <Select
                className={classes.timeInput}
                value={biddingUnit}
                onChange={(e) =>
                  handleFileNameChange({
                    setter: setBiddingUnit,
                    value: e.target.value,
                  })
                }
              >
                <MenuItem value="seconds">seconds</MenuItem>
                <MenuItem value="minutes">minutes</MenuItem>
                <MenuItem value="hours">hours</MenuItem>
                <MenuItem value="days">days</MenuItem>
                <MenuItem value="weeks">weeks</MenuItem>
              </Select>
            </Grid>
            <Grid item md={8}>
              <TextField
                value={timeLockDuration}
                id="outlined-basic"
                label="Time-lock Duration"
                variant="outlined"
                className={classes.textInputSmall}
                onChange={(e) =>
                  handleFileNameChange({
                    setter: setTimeLockDuration,
                    value: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item md={4} sx={{ paddingLeft: "10px" }}>
              <Select
                className={classes.timeInput}
                value={timeLockUnit}
                onChange={(e) =>
                  handleFileNameChange({
                    setter: setTimeLockUnit,
                    value: e.target.value,
                  })
                }
              >
                <MenuItem value="seconds">seconds</MenuItem>
                <MenuItem value="minutes">minutes</MenuItem>
                <MenuItem value="hours">hours</MenuItem>
                <MenuItem value="days">days</MenuItem>
                <MenuItem value="weeks">weeks</MenuItem>
              </Select>
            </Grid>
            <Grid item md={12}>
              <Input
                className={classes.fileUpload}
                type="file"
                onChange={getFile}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            fullWidth
            variant="contained"
            onClick={(event) => {
              submitHandler(event).then(handleClose);
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default NewTimeLockForm;
