import { SxProps, Theme } from "@mui/material";
import { OverridableStringUnion } from "@mui/types";

export interface BasicRatingProps {
  value: number;
  disabled: boolean;
  size?: OverridableStringUnion<"small" | "medium" | "large">;
  sx?: SxProps<Theme> | undefined;
  justifyContent?: string;
  showLabel?: boolean;
  boxWidth?: string;
  width?: string;
  handleChange: (
    e: React.SyntheticEvent<Element, Event>,
    newValue: number | null
  ) => void;
}
