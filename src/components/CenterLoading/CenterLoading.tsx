import { CircularProgress } from "@mui/material";
import React from "react";

const CenterLoading = () => {
  return (
    <CircularProgress
      size={100}
      sx={{
        position: "absolute",
        left: "50%",
        bottom: "50%",
        mt: "-50px",
        ml: "-50px",
      }}
    />
  );
};

export default CenterLoading;
