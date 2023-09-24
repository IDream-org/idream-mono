"use client";

import * as React from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Slide, { SlideProps } from "@mui/material/Slide";

import { closeSnackbar } from "@/app/redux/features/snackbarSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";

const SlideTransition = (props: SlideProps) => (
  <Slide {...props} direction="left" />
);

const SimpleSnackbar = () => {
  const dispatch = useAppDispatch();
  const { message, open, severity } = useAppSelector((state) => state.snackbar);
  return (
    <div style={{ position: "absolute" }}>
      <Snackbar
        open={open}
        onClose={() => dispatch(closeSnackbar())}
        autoHideDuration={6000}
        TransitionComponent={SlideTransition}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ pt: "80px" }}
      >
        <Alert
          variant="filled"
          onClose={() => dispatch(closeSnackbar())}
          severity={severity}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SimpleSnackbar;
