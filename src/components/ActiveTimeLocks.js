import React from "react";
import { Container, Typography } from "@mui/material";
import CountdownTimer from "./CountdownTimer";

function ActiveTimeLocks({ activeTimeLocks, activeTimeLocksDetails }) {
  return (
    <>
      {Object.keys(activeTimeLocks)
        .slice(0)
        .reverse()
        .map((activeTimeLock, index) => {
          return (
            <Container key={index}>
              <CountdownTimer
                targetDate={activeTimeLocks[activeTimeLock].unlockTime}
                callback={() => {}}
              />
              <Typography variant="h5"> {activeTimeLock} </Typography>
              {activeTimeLocksDetails[activeTimeLock].map((entry, index) => {
                console.log(
                  activeTimeLocks[activeTimeLock].unlockTime,
                  Date.now()
                );
                return (
                  <Container key={index}>
                    <Typography gutterBottom variant="h6">
                      {" "}
                      {entry.holder}{" "}
                    </Typography>
                    <Typography gutterBottom variant="h6">
                      {" "}
                      {entry.secretShare}{" "}
                    </Typography>
                  </Container>
                );
              })}
            </Container>
          );
        })}
    </>
  );
}

export default ActiveTimeLocks;
