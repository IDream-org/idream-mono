import { SelectChangeEvent } from "@mui/material";

export interface MultipleSelectChipProps {
  width: number | string;
  selectedIcons: string[];
  handleChange: (e: SelectChangeEvent<string[]>) => void;
}
