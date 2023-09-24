import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from "@mui/material";
import { CategoryItems } from "@prisma/client";
import React from "react";

export interface SearchAutoCompleteProps {
  data: CategoryItems[];
  onChange?: (
    event: React.SyntheticEvent<Element, Event>,
    value: string | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<string> | undefined
  ) => void;
}
