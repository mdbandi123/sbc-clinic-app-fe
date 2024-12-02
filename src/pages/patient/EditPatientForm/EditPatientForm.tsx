import { Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Reducer, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router";
import Toast from "../../../components/feedback/Toast";
import Form from "../../../components/form/Form";
import {
  updatePatient
} from "../../../util/requests/patientRequest";
import { routes } from "../../../util/routes/routes";
import useStore from "../../../util/store/store";
import styles from "./EditPatientForm.module.css";

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

function EditPatientForm() {
  const [isError, setIsError] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    patientEditFormData,
    setToolbarTitle,
    togglePatientTrigger,
    setIsSuccessfulPatientEdit,
  } = useStore();
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
    } else if (action.type === "reset") {
      return initialState;
    }
  }, patientEditFormData);

  useEffect(() => {
    setToolbarTitle("Edit Patient");
  }, []);

  const mutation = useMutation({
    mutationFn: updatePatient,
    onSuccess: (data) => {
      togglePatientTrigger();
      resetInputFields();
      setIsSuccessfulPatientEdit(true);
      navigate(routes.searchPatient);
    },
    onError: (error) => {
      handleErrorToastOpen();
    },
  });

  const handleDispatch = (action: ActionType) => {
    dispatch(action);
  };

  const handleFormSubmit = () => {
    const payload = {
      params: patientEditFormData.patientId,
      formState: state,
    };

    mutation.mutate(payload);
  };

  const handleErrorToastClose = () => {
    setIsError(false);
  };

  const handleErrorToastOpen = () => {
    setIsError(true);
  };

  const resetInputFields = () => {
    dispatch({ type: "reset", payload: null });
  };

  return (
    <section className={styles.mainCont}>
      <div>
        <h1>Patient Details:</h1>
        <Form
          handleDispatch={handleDispatch}
          state={state}
          formType="patient"
        />
      </div>
      <div className={styles.button}>
        <Button variant="contained" size="large" onClick={handleFormSubmit}>
          Edit Patient
        </Button>
      </div>
      <Toast
        isOpen={isError}
        message={"Error encountered"}
        onClose={handleErrorToastClose}
        isError
      />
    </section>
  );
}

export default EditPatientForm;
