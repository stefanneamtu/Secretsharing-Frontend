import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import useStyles from "../styles/styles";

function ConnectButton({ callback }) {
  return (
    <Button variant="contained" onClick={callback}>
      Connect MetaMask
    </Button>
  );
}

function ReportCheater({ user, contract }) {
  const [open, setOpen] = useState(false);
  const [ipfsFile, setIpfsFile] = useState("");
  const [secret, setSecret] = useState("");

  const classes = useStyles();

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  async function submitHandler() {
    await contract.methods.reportCheater(ipfsFile, secret).send({ from: user });
    setSecret("");
    setIpfsFile("");
  }

  return (
    <>
      <Button
        style={{
          color: "white",
          textTransform: "none",
        }}
        onClick={handleOpen}
      >
        <Typography variant="h6">Report</Typography>
      </Button>
      <Dialog
        open={open}
        className={classes.publicKeyForm}
        onClose={handleClose}
      >
        <DialogTitle> Report a cheater </DialogTitle>
        <DialogContent>
          <TextField
            value={ipfsFile}
            id="outlined-basic"
            label="IPFS Hash"
            variant="outlined"
            fullWidth
            className={classes.textInputLarge}
            onChange={(e) => setIpfsFile(e.target.value)}
          />
          <TextField
            value={secret}
            id="outlined-basic"
            label="Shamir Secret"
            variant="outlined"
            fullWidth
            className={classes.textInputLarge}
            onChange={(e) => setSecret(e.target.value)}
          />
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

function SubmitPublicKey({ user, contract }) {
  const [open, setOpen] = useState(false);
  const [publicKey, setPublicKey] = useState("");

  const classes = useStyles();

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  async function submitHandler() {
    await contract.methods.submitPublicKey(publicKey).send({ from: user });
    setPublicKey("");
  }

  return (
    <>
      <Button
        style={{
          color: "white",
          textTransform: "none",
        }}
        onClick={handleOpen}
      >
        <Typography variant="h6">Upload Key</Typography>
      </Button>
      <Dialog
        open={open}
        className={classes.publicKeyForm}
        onClose={handleClose}
      >
        <DialogTitle> Upload your public key </DialogTitle>
        <DialogContent>
          <TextField
            value={publicKey}
            id="outlined-basic"
            label="Public Key"
            variant="outlined"
            multiline
            fullWidth
            rows={8}
            className={classes.textInputLarge}
            onChange={(e) => setPublicKey(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            fullWidth
            variant="contained"
            onClick={(event) => {
              submitHandler(event);
              handleClose();
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function Account({ user, contract }) {
  return (
    <>
      <ReportCheater contract={contract} user={user} />
      <SubmitPublicKey contract={contract} user={user} />
      <Typography variant="h6">
        Connected with {user.substr(0, 5)}...{user.substr(user.length - 4)}
      </Typography>
    </>
  );
}

function NavBar({ user, contract, callback }) {
  const pages = ["Dashboard", "Contributions", "Bid"];
  const route = ["/", "/timelocks", "/bid"];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          <Box>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Time-lock
            </Typography>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              float: "left",
              width: "auto",
              padding: "0px 20px 0px 20px",
            }}
          >
            {pages.map((page, index) => {
              return (
                <Link
                  key={index}
                  to={route[index]}
                  style={{
                    display: "block",
                    textDecoration: "none",
                  }}
                >
                  <Button
                    style={{
                      color: "white",
                      textTransform: "none",
                    }}
                  >
                    <Typography variant="h6"> {page} </Typography>
                  </Button>
                </Link>
              );
            })}
          </Box>
          {user ? (
            Account({ user, contract })
          ) : (
            <Box>
              {" "}
              <ConnectButton callback={callback} />
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
