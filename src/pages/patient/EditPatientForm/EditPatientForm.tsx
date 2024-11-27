import { useReducer } from "react";
import Form from "../../../components/form/Form";
import styles from "./EditPatientForm.module.css";
import { Button } from "@mui/material";
import { insertPatient, updatePatient } from "../../../util/requests/patientRequest";
import { useMutation } from "@tanstack/react-query";
import useStore from "../../../util/store/store";

type PatientReducerState = {
  name: string,
  icNo: string,
  gender: string,
  address: string,
  contactNo: string,
  email: string
}

type ActionType = {
  type: string,
  payload: string
}

function EditPatientForm(){
  const {patientEditFormData} = useStore();
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
    } else if(action.type === 'email'){
      return {...state, email:action.payload};
    } 
  }, patientEditFormData);

  const mutation = useMutation({
    mutationFn: updatePatient,
    onSuccess: (data) => {
      console.log('patient edited:', data);
    },
    onError: (error) => {
      console.error('Error editing patient:', error);
    }
  });

  const handleDispatch = (action: ActionType) => {
    dispatch(action);
  }

  const handleFormSubmit = () => {
    const payload = {
      params: patientEditFormData.patientId,
      formState: state
    };

    mutation.mutate(payload);
  }

  return(
    <section className={styles.mainCont}>
      <h1>Edit Patient</h1>
      <Form handleDispatch={handleDispatch} state={state} formType="patient"/>
      <div className={styles.button}>
        <Button variant="contained" size="large" onClick={handleFormSubmit}>Edit Patient</Button>
      </div>
    </section>
  )
}

export default EditPatientForm;