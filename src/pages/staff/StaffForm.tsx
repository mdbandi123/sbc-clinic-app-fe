import { useReducer } from 'react';
import styles from './StaffForm.module.css';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@mui/material';
import Form from '../../components/form/Form';
import { insertStaff } from '../../util/requests/staffRequest';

type StaffState = {
  name: string,
  icNo: string,
  gender: string,
  address: string,
  contactNo: string,
  position: string
}

type ActionType = {
  type: string,
  payload: string
}

function StaffForm(){
  const [state, dispatch] = useReducer((state: StaffState, action:ActionType) => {
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
    } else if(action.type === 'position'){
      return {...state, position:action.payload};
    } 
  }, {
    name: '',
    icNo: '',
    gender: '',
    address: '',
    contactNo: '',
    position: '',
  });

  const mutation = useMutation({
    mutationFn: insertStaff,
    onSuccess: (data) => {
      console.log('staff created:', data);
    },
    onError: (error) => {
      console.error('Error creating staff:', error);
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
      <h1>Add Staff</h1>
      <Form handleDispatch={handleDispatch} state={state} formType="staff"/>
      <div className={styles.button}>
        <Button variant="contained" size="large" onClick={handleFormSubmit}>Add New Patient</Button>
      </div>
    </section>
  )
}

export default StaffForm;

