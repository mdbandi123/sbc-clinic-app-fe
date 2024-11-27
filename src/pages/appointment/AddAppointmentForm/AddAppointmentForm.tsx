import { Button, Grid2, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useReducer, useState } from 'react';
import { getPatientByIcNo, getPatientById, getPatientByName, insertPatient } from '../../../util/requests/patientRequest';
import styles from './AddAppointmentForm.module.css';
import Form from '../../../components/form/Form';
import SearchField from '../../../components/input/SearchField';
import { insertAppointment } from '../../../util/requests/appointmentRequest';

type ActionType = {
  type: string,
  payload: string
}

type PatientResponse = {
  patientId: number,
  name: string,
  icNo: string,
  gender: string,
  address: string,
  contactNo: string,
  registrationTime: string,
  profileImage: string
}

function AddAppointmentForm(){
  const [searchText, setSearchText] = useState<string>('');
  const [patientDetails, setPatientDetails] = useState<PatientResponse | undefined>(undefined);
  const [state, dispatch] = useReducer((state, action:ActionType) => {
    if(action.type === 'remark'){
      return {...state, remark:action.payload};
    } else if(action.type === 'date'){
      return {...state, date:action.payload};
    }
  }, {
    remark: '',
    date: ''
  });

  const mutation = useMutation({
    mutationFn: insertAppointment,
    onSuccess: (data) => {
      console.log('patient created:', data);
    },
    onError: (error) => {
      console.error('Error creating patient:', error);
    }
  });

  const handleSearchTextChange = (e: SelectChangeEvent) => {
    setSearchText(e.target.value);
  }

  const handleDispatch = (action: ActionType) => {
    dispatch(action);
  }

  const handleFormSubmit = () => {
    const payload = {
      ...state,
      fkPatientId: patientDetails?.patientId,
    }
    mutation.mutate(payload);
    console.log(state);
  }

  const handleSearchSubmit = async () => {
      const response = getPatientByIcNo(searchText.trim());
      const data = await response;
      console.log(data[0]);
      setPatientDetails(data[0]);
  }

  return(
    <section className={styles.mainCont}>
      <h1>Add Appointment</h1>
        <Grid2 container spacing={3}>
        <Grid2 size={3}>
          <SearchField onChange={handleSearchTextChange} value={searchText}/>
        </Grid2>
        <Grid2> 
          <Button variant="contained" size="large" onClick={handleSearchSubmit}>Search</Button>
        </Grid2>
        {patientDetails !== undefined ? (
          <>
          <Grid2 container size={12} spacing={3}>
            <Grid2 size={12}>
              <h3>User Details</h3>
            </Grid2>
            <Grid2 size={6}>
              <TextField
                disabled
                id="outlined-required"
                label="Full Name"
                value={patientDetails.name}
                sx={{width:'100%'}}
              />
            </Grid2>
            <Grid2 size={3}>
              <TextField
                disabled
                id="outlined-required"
                label="Gender"
                value={patientDetails.gender}
                sx={{width:'100%'}}
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                disabled
                id="outlined-required"
                label="Address"
                value={patientDetails.address}
                sx={{width:'100%'}}
              />
            </Grid2>
            <Grid2 size={3}>
              <TextField
                disabled
                id="outlined-required"
                label="Contact No."
                value={patientDetails.contactNo}
                sx={{width:'100%'}}
              />
            </Grid2>
          </Grid2>
          <Grid2 container spacing={3} size={12}>
            <Grid2 size={12}>
              <h3>Appointment Details</h3>
            </Grid2>
            <Grid2 size={12}>
              <Form handleDispatch={handleDispatch} state={state} formType="appointment"/>
            </Grid2>

            <div className={styles.button}>
              <Button variant="contained" size="large" onClick={handleFormSubmit}>Add New Appointment</Button>
            </div>
          </Grid2>
          </>
        ): (
          <Grid2 size={12}>
            <h1>no data</h1>
          </Grid2>
        )}
      </Grid2>
    </section>
  )
}

export default AddAppointmentForm;