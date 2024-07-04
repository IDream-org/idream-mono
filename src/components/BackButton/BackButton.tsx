import React from "react";
import { useMediaQuery, useTheme } from "@mui/material";

import Button from "@mui/material/Button";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useRouter } from "next/navigation";

import { BackButtonProps } from "./BackButtonProps";

const BackButton: React.FC<BackButtonProps> = ({ path, onClick }) => {
  const router = useRouter();
  const theme = useTheme();
  const lgSize = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <Button
      sx={{
        ml: lgSize ? 0 : 8,
      }}
      onClick={onClick || (() => router.push(path))}
    >
      <KeyboardBackspaceIcon fontSize="large" />
    </Button>
  );
};

export default BackButton;
