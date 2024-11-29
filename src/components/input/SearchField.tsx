import { Search } from "@mui/icons-material";
import { TextField, InputAdornment } from "@mui/material";

function SearchField({ onChange, value }) {
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
