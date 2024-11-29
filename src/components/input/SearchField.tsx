import { Search } from "@mui/icons-material";
import { TextField, InputAdornment } from "@mui/material";
import { ChangeEventHandler } from "react";

type SearchFieldProps = {
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
  value: string
}
function SearchField({ onChange, value }: SearchFieldProps) {
  return (
    <>
      <TextField
        sx={{ width: "100%" }}
        onChange={onChange}
        value={value}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          },
        }}
      />
    </>
  );
}

export default SearchField;
