import React from "react";
import { Autocomplete, Stack, TextField } from "@mui/material";
import { SearchAutoCompleteProps } from "./SearchAutoCompleteProps";

const SearchAutoComplete: React.FC<SearchAutoCompleteProps> = ({
  data,
  onChange,
}) => {
  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        onChange={onChange}
        options={data.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search"
            InputProps={{
              ...params.InputProps,
            }}
          />
        )}
      />
    </Stack>
  );
};

export default SearchAutoComplete;
