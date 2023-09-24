import { SnackbarSeverity } from "../../app/models/SnackbarSeverity";
import { SyntheticEvent } from "react";

export interface SimpleSnackbarProps {
  open: boolean;
  message: string;
  severity: SnackbarSeverity;
  onClose: (event?: Event | SyntheticEvent, reason?: string) => void;
}
