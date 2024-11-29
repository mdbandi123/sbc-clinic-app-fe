import { Grid2, MenuItem, SelectChangeEvent, TextField } from "@mui/material";
import SelectDropdown from "../input/SelectDropdown";
import { ChangeEventHandler } from "react";
import DateTimeInput from "../input/DateTimeInput";

type DispatchParams = {
  type: string;
  payload: string;
};

type FormProps = {
  state: Record<string, string>;
  handleDispatch: (action: DispatchParams) => void;
  formType?: "patient" | "staff" | "appointment" | "report" | "medcert";
  staffChoices?: string[];
};

function Form({
  state,
  handleDispatch,
  formType,
  staffChoices = [],
}: FormProps) {
  const handleNameChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    handleDispatch({ type: "name", payload: e.target.value });
  };

  const handleIcNoChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    handleDispatch({ type: "icNo", payload: e.target.value });
  };

  const handleGenderChange = (e: SelectChangeEvent) => {
    handleDispatch({ type: "gender", payload: e.target.value });
  };

  const handleAddressChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    handleDispatch({ type: "address", payload: e.target.value });
  };

  const handleContactNumberChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    handleDispatch({ type: "contactNo", payload: e.target.value });
  };

  const handleEmailChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    handleDispatch({ type: "email", payload: e.target.value });
  };

  const handlePositionChange = (e: SelectChangeEvent) => {
    handleDispatch({ type: "position", payload: e.target.value });
  };

  const handleRemarkChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    handleDispatch({ type: "remark", payload: e.target.value });
  };

  const handleDetailsChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    handleDispatch({ type: "details", payload: e.target.value });
  };

  const handleStaffChange = (e: SelectChangeEvent) => {
    handleDispatch({ type: "staff", payload: e.target.value });
  };

  const handleReasonChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    handleDispatch({ type: "reason", payload: e.target.value });
  };

  const handleDayChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    handleDispatch({ type: "day", payload: e.target.value });
  };

  if (formType === "patient" || formType === "staff") {
    return (
      <Grid2 container spacing={3}>
        <Grid2 size={7}>
          <TextField
            required
            id="outlined-required"
            label="Full Name"
            value={state.name}
            onChange={handleNameChange}
            sx={{ width: "100%" }}
          />
        </Grid2>
        <Grid2 size={3}>
          <SelectDropdown
            label={"Gender"}
            onChange={handleGenderChange}
            value={state.gender}
            isRequired={true}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </SelectDropdown>
        </Grid2>
        <Grid2 size={7}>
          <TextField
            required
            id="outlined-required"
            label="IC Number"
            value={state.icNo}
            onChange={handleIcNoChange}
            sx={{ width: "100%" }}
          />
        </Grid2>
        <Grid2 size={3}>
          <TextField
            required
            id="outlined-required"
            label="Contact Number"
            value={state.contactNo}
            onChange={handleContactNumberChange}
            sx={{ width: "100%" }}
          />
        </Grid2>
        <Grid2 size={7}>
          <TextField
            required
            id="outlined-required"
            label="Address"
            value={state.address}
            onChange={handleAddressChange}
            sx={{ width: "100%" }}
            multiline
          />
        </Grid2>
        {formType === "staff" && (
          <Grid2 size={3}>
            <SelectDropdown
              label={"Position"}
              onChange={handlePositionChange}
              value={state.position}
              isRequired={true}
            >
              <MenuItem value="Doctor">Doctor</MenuItem>
              <MenuItem value="Nurse">Nurse</MenuItem>
            </SelectDropdown>
          </Grid2>
        )}
        <Grid2 size={7}>
          <TextField
            required
            id="outlined-required"
            label="Email"
            value={state.email}
            onChange={handleEmailChange}
            sx={{ width: "100%" }}
            multiline
          />
        </Grid2>
      </Grid2>
    );
  }

  if (formType === "appointment") {
    return (
      <>
        <Grid2 container spacing={3}>
          <Grid2 size={8}>
            <TextField
              multiline
              required
              id="outlined-required"
              label="Remark"
              value={state.remark}
              onChange={handleRemarkChange}
              sx={{ width: "100%" }}
            />
          </Grid2>
          <Grid2 size={4}>
            <DateTimeInput handleDispatch={handleDispatch} />
          </Grid2>
        </Grid2>
      </>
    );
  }

  if (formType === "report") {
    return (
      <>
        <Grid2 container spacing={3}>
          <Grid2 size={8}>
            <TextField
              multiline
              required
              id="outlined-required"
              label="Details"
              value={state.details}
              onChange={handleDetailsChange}
              sx={{ width: "100%" }}
            />
          </Grid2>
          <Grid2 size={4}>
            <SelectDropdown
              label={"Generated by"}
              onChange={handleStaffChange}
              value={state.staff}
              isRequired={true}
            >
              {staffChoices.map((item, idx) => {
                return (
                  <MenuItem key={idx} value={item.staffId}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </SelectDropdown>
          </Grid2>
        </Grid2>
      </>
    );
  }

  if (formType === "medcert") {
    return (
      <>
        <Grid2 container spacing={3}>
          <Grid2 size={6}>
            <TextField
              multiline
              required
              id="outlined-required"
              label="Reason"
              value={state.reason}
              onChange={handleReasonChange}
              sx={{ width: "100%" }}
            />
          </Grid2>
          <Grid2 size={3}>
            <DateTimeInput handleDispatch={handleDispatch} />
          </Grid2>
          <Grid2 size={3}>
            <TextField
              required
              id="outlined-required"
              label="Number of days"
              value={state.day}
              onChange={handleDayChange}
              sx={{ width: "100%" }}
            />
          </Grid2>
        </Grid2>
      </>
    );
  }
}

export default Form;
