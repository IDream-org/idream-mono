import { Grid, Link, Typography } from "@mui/material";
import React from "react";

const Unauthorized = () => {
  return (
    <Grid
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Typography fontSize={"200px"}>401</Typography>
      <Grid display={"flex"} flexDirection={"column"}>
        <Typography fontSize={"40px"}>NOT AUTHORIZED</Typography>
        <Typography pt={2}>You are not allowed to see this page</Typography>
        <Typography component={Link}>
          To request access, please click here.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Unauthorized;
