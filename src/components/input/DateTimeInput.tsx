import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Dayjs } from "dayjs";

type DateTimeInputProps = {
    handleDispatch: (e: Record<string, string | undefined>) => void;
}
function DateTimeInput({ handleDispatch }: DateTimeInputProps) {
  const handleDateTimeChange = (value: Dayjs | null) => {
    handleDispatch({
      type: "date",
      payload: value?.format("YYYY-MM-DDTHH:mm:ss"),
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
