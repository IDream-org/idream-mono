import React from "react";
import { CircularProgress } from "@mui/material";
import { CenterLoadingProps } from "./CenterLoadingProps";

const CenterLoading: React.FC<CenterLoadingProps> = ({ sx }) => {
  return (
    <CircularProgress
      size={100}
      sx={{
        position: "absolute",
        left: "50%",
        bottom: "50%",
        mt: "-50px",
        ml: "-50px",
        ...sx,
      }}
    />
  );
};

export default CenterLoading;
