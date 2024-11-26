import { useReducer } from "react";
import Form from "../../components/form/Form";
import styles from "./PatientForm.module.css";
import { Button } from "@mui/material";
import { insertPatient } from "../../request/patientRequest";
import { useMutation } from "@tanstack/react-query";

type PatientReducerState = {
  name: string,
  icNo: string,
  gender: string,
  address: string,
  contactNo: string,
}

type ActionType = {
  type: string,
  payload: string
}

function PatientForm(){
  const [state, dispatch] = useReducer((state: PatientReducerState, action:ActionType) => {
    if(action.type === 'name'){
      return {...state, name:action.payload};
    } else if(action.type === 'icNo'){
      return {...state, icNo:action.payload};
    } else if(action.type === 'gender'){
      return {...state, gender:action.payload};
    } else if(action.type === 'address'){
      return {...state, address:action.payload};
    } else if(action.type === 'contactNo'){
      return {...state, contactNo:action.payload};
    } 
  }, {
    name: '',
    icNo: '',
    gender: '',
    address: '',
    contactNo: '',
  });
    
  const mutation = useMutation({
    mutationFn: insertPatient,
    onSuccess: (data) => {
      console.log('patient created:', data);
    },
    onError: (error) => {
      console.error('Error creating patient:', error);
    }
  });

  const handleDispatch = (action: ActionType) => {
    dispatch(action);
  }

  const handleFormSubmit = () => {
    mutation.mutate(state);
  }

  return(
    <section className={styles.mainCont}>
      <h1>Add Patient</h1>
      <Form handleDispatch={handleDispatch} state={state} formType="patient"/>
      <div className={styles.button}>
        <Button variant="contained" size="large" onClick={handleFormSubmit}>Add New Patient</Button>
      </div>
    </section>
  )
}

export default PatientForm;