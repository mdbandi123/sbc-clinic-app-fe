import {
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React, { ReactNode, useState } from "react";

type SelectDropdownProps = {
  label: string;
  onChange: (e: SelectChangeEvent) => void;
  children: ReactNode;
  value: string;
  isRequired?: boolean;
};
function SelectDropdown({
  label,
  onChange,
  children,
  value,
  isRequired = false,
}: SelectDropdownProps) {
  return (
    <>
      <FormControl fullWidth required={isRequired}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          onChange={onChange}
        >
          {children}
        </Select>
      </FormControl>
    </>
  );
}

export default SelectDropdown;
