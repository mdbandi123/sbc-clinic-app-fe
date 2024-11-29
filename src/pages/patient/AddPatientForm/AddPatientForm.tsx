import { Reducer, useEffect, useReducer, useState } from "react";
import Form from "../../../components/form/Form";
import styles from "./AddPatientForm.module.css";
import { Button, Typography } from "@mui/material";
import { insertPatient } from "../../../util/requests/patientRequest";
import { useMutation } from "@tanstack/react-query";
import useStore from "../../../util/store/store";
import { useNavigate } from "react-router";
import Toast from "../../../components/feedback/Toast";

type PatientReducerState = {
  name: string;
  icNo: string;
  gender: string;
  address: string;
  contactNo: string;
  email: string;
};

type ActionType = {
  type: string;
  payload: string;
};

const initialState: PatientReducerState = {
  name: "",
  icNo: "",
  gender: "",
  address: "",
  contactNo: "",
  email: "",
};

function AddPatientForm() {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const { setToolbarTitle } = useStore();
  const [state, dispatch] = useReducer<
    Reducer<PatientReducerState, ActionType>
  >((state, action) => {
    if (action.type === "name") {
      return { ...state, name: action.payload };
    } else if (action.type === "icNo") {
      return { ...state, icNo: action.payload };
    } else if (action.type === "gender") {
      return { ...state, gender: action.payload };
    } else if (action.type === "address") {
      return { ...state, address: action.payload };
    } else if (action.type === "contactNo") {
      return { ...state, contactNo: action.payload };
    } else if (action.type === "email") {
      return { ...state, email: action.payload };
    } else if (action.type === "reset"){
      return initialState;
    }
  }, initialState);

  useEffect(() => {
    setToolbarTitle("Add Patient");
  }, []);

  const mutation = useMutation({
    mutationFn: insertPatient,
    onSuccess: (data) => {
      resetInputFields();
      handleSuccessToastOpen();
    },
    onError: (error) => {
      handleErrorToastOpen();
    },
  });

  const handleDispatch = (action: ActionType) => {
    dispatch(action);
  };

  const resetInputFields = () => {
    dispatch({type: 'reset', payload: null})
  };

  const handleFormSubmit = () => {
    mutation.mutate(state);
  };

  const handleSuccessToastClose = () => {
    setIsSuccess(false);
  }

  const handleSuccessToastOpen = () => {
    setIsSuccess(true);
  }

  const handleErrorToastClose = () => {
    setIsError(false);
  }

  const handleErrorToastOpen = () => {
    setIsError(true);
  }

  return (
    <section className={styles.mainCont}>
      <div>
        <Typography sx={{ fontSize: "1.1em" }}>
          Dear clients, please verify all information inputted in the given
          fields before our staff submits the form. Thank you!
        </Typography>
      </div>
      <div>
        <h2>Patient Details:</h2>
        <Form
          handleDispatch={handleDispatch}
          state={state}
          formType="patient"
        />
      </div>
      <div className={styles.button}>
        <Button variant="contained" size="large" onClick={handleFormSubmit}>
          Add New Patient
        </Button>
      </div>
      <Toast isOpen={isSuccess} message={"New patient successfully added!"} onClose={handleSuccessToastClose}/>
      <Toast isOpen={isError} message={"Error encountered"} onClose={handleErrorToastClose} isError/>
    </section>
  );
}

export default AddPatientForm;
