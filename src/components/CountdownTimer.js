import React, { useEffect, useMemo } from "react";
import { Typography } from "@mui/material";

const CountdownTimer = ({ targetDate, callback, ipfsCid }) => {
  const date = useMemo(() => new Date(targetDate), [targetDate]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (new Date().getTime() >= date.getTime()) {
        callback(ipfsCid);
      }
    }, 1000);

    if (new Date().getTime() >= date.getTime()) {
      callback(ipfsCid);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [callback, date, ipfsCid]);

  if (new Date().getTime() >= date.getTime()) {
    return <Typography variant="h6"> Time-lock ended </Typography>;
  } else {
    return (
      <Typography variant="h6">
        {" "}
        {date.toDateString()} {date.toLocaleTimeString()}{" "}
      </Typography>
    );
  }
};

export default CountdownTimer;
