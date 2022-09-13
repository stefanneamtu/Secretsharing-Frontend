import React from "react";
import { Container } from "@mui/material";
import NewTimeLockForm from "./NewTimeLockForm";
import RebuiltKeys from "./RebuiltKeys";

function DashBoard({ user, contract }) {
  return (
    <>
      <Container style={{ width: "100%", marginTop: "85px" }}>
        <NewTimeLockForm contract={contract} user={user} />
        <RebuiltKeys contract={contract} />
      </Container>
    </>
  );
}

export default DashBoard;
