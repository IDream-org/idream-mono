import { OverridableStringUnion } from "@mui/types/";

export interface BasicDialogProps {
  title: string;
  text: string;
  confirmText: string;
  cancelText: string;
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  children?: React.ReactNode;
  showButton?: boolean;
  confirmColor?: OverridableStringUnion<
    | "warning"
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
  >;
}
