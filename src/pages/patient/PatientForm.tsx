import { useReducer } from "react";
import Form from "../../components/form/Form";
import styles from "./PatientForm.module.css";
import { Button } from "@mui/material";

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

  const handleDispatch = (action: ActionType) => {
    dispatch(action);
  }

  return(
    <section className={styles.mainCont}>
      <h1>Add Patient</h1>
      <Form handleDispatch={handleDispatch} state={state} formType="patient"/>
      <Button variant="contained" size="large" className={styles.button}>Add New Patient</Button>
    </section>
  )
}

export default PatientForm;