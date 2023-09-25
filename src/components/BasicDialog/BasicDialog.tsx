import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { BasicDialogProps } from "./BasicDialogProps";

const BasicDialog: React.FC<BasicDialogProps> = ({
  title,
  text,
  confirmText,
  cancelText,
  open,
  confirmColor,
  showButton = true,
  children,
  handleClose,
  handleConfirm,
}) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby={`alert-dialog-${title}`}
        aria-describedby={`alert-dialog-${text}`}
      >
        <DialogTitle id={`alert-dialog-${title}`}>{title}</DialogTitle>
        {children}
        <DialogContent>
          <DialogContentText id={`alert-dialog-${text}`}>
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {showButton && (
            <Button
              variant="contained"
              color={confirmColor}
              onClick={handleConfirm}
            >
              {confirmText}
            </Button>
          )}
          <Button onClick={handleClose} autoFocus>
            {cancelText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default BasicDialog;
