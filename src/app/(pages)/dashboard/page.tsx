"use client";
import React from "react";
import { useSession } from "next-auth/react";

import Grid from "@mui/material/Grid";

const DashboardPage = () => {
  const { data: session } = useSession();
  return (
    <Grid textAlign={"center"}>
      Dashboard {session?.user.firstName} {session?.user.lastName}
    </Grid>
  );
};

export default DashboardPage;
