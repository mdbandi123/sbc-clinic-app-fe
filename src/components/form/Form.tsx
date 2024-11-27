import { Grid2, MenuItem, SelectChangeEvent, TextField } from "@mui/material";
import SelectDropdown from "../input/SelectDropdown";
import { ChangeEventHandler} from "react";
import { DateTimePicker } from "@mui/x-date-pickers";
import DateTimeInput from "../input/DateTimeInput";

type DispatchParams = {
  type: string,
  payload: string
}

type FormProps = {
  state: Record<string, string>,
  handleDispatch: (action:DispatchParams) => void,
  formType?: 'patient' | 'staff' | 'appointment' | 'report' | 'medcert'
}

function Form({state, handleDispatch, formType}: FormProps){

  const handleNameChange:ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    handleDispatch({type: 'name', payload: e.target.value})
  } 

  const handleIcNoChange:ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    handleDispatch({type: 'icNo', payload: e.target.value})
  } 

  const handleGenderChange = (e: SelectChangeEvent) => {
    handleDispatch({type: 'gender', payload: e.target.value})
  } 

  const handleAddressChange:ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    handleDispatch({type: 'address', payload: e.target.value})
  } 

  const handleContactNumberChange:ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    handleDispatch({type: 'contactNo', payload: e.target.value})
  } 

  const handleEmailChange:ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    handleDispatch({type: 'email', payload: e.target.value})
  } 

  const handlePositionChange = (e: SelectChangeEvent) => {
    handleDispatch({type: 'position', payload: e.target.value})
  }

  const handleRemarkChange:ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    handleDispatch({type: 'remark', payload: e.target.value})
  } 

  if(formType === 'patient' || formType === 'staff'){
    return(
      <Grid2 container spacing={3}>
        <Grid2 size={7}>
          <TextField
            required
            id="outlined-required"
            label="Full Name"
            value={state.name}
            onChange={handleNameChange}
            sx={{width:'100%'}}
          />
        </Grid2>
        <Grid2 size={3}>
          <SelectDropdown label={"Gender"} onChange={handleGenderChange} value={state.gender} isRequired={true}>
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
            sx={{width:'100%'}}
          />
        </Grid2>
        <Grid2 size={3}>
          <TextField
            required
            id="outlined-required"
            label="Contact Number"
            value={state.contactNo}
            onChange={handleContactNumberChange}
            sx={{width:'100%'}}
          />
        </Grid2>
        <Grid2 size={7}>
          <TextField
            required
            id="outlined-required"
            label="Address"
            value={state.address}
            onChange={handleAddressChange}
            sx={{width:'100%'}}
            multiline
          />
        </Grid2>
        {formType === 'staff' && (
        <Grid2 size={3}>
          <SelectDropdown label={"Position"} onChange={handlePositionChange} value={state.position} isRequired={true}>
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
            sx={{width:'100%'}}
            multiline
          />
        </Grid2>
      </Grid2>
      )
    }

    if(formType === 'appointment'){
      return (<>
        <Grid2 container spacing={3}>
          <Grid2 size={8}>
            <TextField
              multiline
              required
              id="outlined-required"
              label="Remark"
              value={state.name}
              onChange={handleRemarkChange}
              sx={{width:'100%'}}
            />
          </Grid2>
          <Grid2 size={4}>
            <DateTimeInput handleDispatch = {handleDispatch}/>
          </Grid2>
        </Grid2>
      </>)
    }
}

export default Form;