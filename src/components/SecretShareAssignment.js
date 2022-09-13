import React, { useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";

function SecretShareAssignment({ ipfsCid, contract, user }) {
  const [keccakCheck, setKeccakCheck] = useState("");
  const [secretShare, setSecretShare] = useState("");
  const [holder, setHolder] = useState("");

  function handleFileNameChange({ setter, newFileName }) {
    setter(newFileName);
  }

  async function submitHandler() {
    await contract.methods
      .submitEncryptedSecret(ipfsCid, secretShare, keccakCheck, holder)
      .send({ from: user });
    setKeccakCheck("");
    setSecretShare("");
    setHolder("");
  }

  return (
    <Box>
      <Typography variant="h5"> Assign a new secret share: </Typography>
      <Grid container>
        <Grid elem>
          <TextField
            value={secretShare}
            id="outlined-basic"
            label="Secret Share"
            variant="outlined"
            onChange={(e) =>
              handleFileNameChange({
                setter: setSecretShare,
                newFileName: e.target.value,
              })
            }
          />
        </Grid>
        <Grid elem>
          <TextField
            value={holder}
            id="outlined-basic"
            label="Holder Address"
            variant="outlined"
            onChange={(e) =>
              handleFileNameChange({
                setter: setHolder,
                newFileName: e.target.value,
              })
            }
          />
        </Grid>
        <Grid elem>
          <TextField
            value={keccakCheck}
            id="outlined-basic"
            label="Keccak Check"
            variant="outlined"
            onChange={(e) =>
              handleFileNameChange({
                setter: setKeccakCheck,
                newFileName: e.target.value,
              })
            }
          />
        </Grid>
        <Grid elem>
          <Button
            variant="contained"
            onClick={submitHandler}
            style={{ minHeight: "100%", marginLeft: "10px" }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SecretShareAssignment;
