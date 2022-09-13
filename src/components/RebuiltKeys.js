import React, { useState } from "react";
import { Paper, Typography } from "@mui/material";
import secrets from "../libraries/secrets";

function RebuiltKeys({ contract }) {
  const [returnedSecrets, setReturnedSecrets] = useState({});

  contract.events.ReadyToRebuildKey({ fromBlock: 0 }, function (error, event) {
    if (error) {
      alert("Error occurred - ReadyToRebuildKey");
    } else {
      const ipfsCid = event.returnValues.ipfsHash;
      const newReturnedSecrets = event.returnValues.shares;
      if (!returnedSecrets[ipfsCid]) {
        setReturnedSecrets((prevState) => {
          return { ...prevState, [ipfsCid]: newReturnedSecrets };
        });
      } else {
        const sorted = returnedSecrets[ipfsCid].slice().sort();
        if (
          newReturnedSecrets &&
          !newReturnedSecrets
            .slice()
            .sort()
            .every((value, index) => value === sorted[index])
        ) {
          setReturnedSecrets((prevState) => {
            return { ...prevState, [ipfsCid]: newReturnedSecrets };
          });
        }
      }
    }
  });

  return (
    <>
      <Typography variant="h5"> Finished Time-locks: </Typography>
      {Object.keys(returnedSecrets).map((elem, index) => {
        return (
          <Paper
            elevation={3}
            style={{ padding: "8px", marginTop: "16px" }}
            key={index}
          >
            <Typography gutterBottom variant="h5">
              {" "}
              {elem}{" "}
            </Typography>
            {returnedSecrets[elem].map((secret, key) => (
              <Typography gutterBottom key={key} variant="h6">
                {" "}
                {secret}{" "}
              </Typography>
            ))}
            <Typography gutterBottom variant="h5">
              Rebuilt Key:
            </Typography>
            <Typography gutterBottom variant="h6">
              {(() => {
                try {
                  return secrets.hex2str(
                    secrets.combine(returnedSecrets[elem])
                  );
                } catch (err) {
                  return "Error in shares!";
                }
              })()}
            </Typography>
          </Paper>
        );
      })}
    </>
  );
}

export default RebuiltKeys;
