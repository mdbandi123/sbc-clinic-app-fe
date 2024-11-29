import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

function DateTimeInput({ handleDispatch }) {
  const handleDateTimeChange = (value) => {
    handleDispatch({
      type: "date",
      payload: value.format("YYYY-MM-DDTHH:mm:ss"),
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label="Date & Time"
        onChange={handleDateTimeChange}
        sx={{ width: "100%" }}
      />
    </LocalizationProvider>
  );
}

export default DateTimeInput;
