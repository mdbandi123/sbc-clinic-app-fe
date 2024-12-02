import { Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useReducer, useState } from "react";
import Toast from "../../../components/feedback/Toast";
import Form from "../../../components/form/Form";
import { insertStaff } from "../../../util/requests/staffRequest";
import useStore from "../../../util/store/store";
import styles from "./AddStaffForm.module.css";

type StaffState = {
  name: string;
  icNo: string;
  gender: string;
  address: string;
  contactNo: string;
  position: string;
  email: string;
};

type ActionType = {
  type: string;
  payload: string;
};

const initialState = {
  name: "",
  icNo: "",
  gender: "",
  address: "",
  contactNo: "",
  position: "",
  email: "",
}

function AddStaffForm() {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const {setToolbarTitle} = useStore();
  const [state, dispatch] = useReducer(
    (state: StaffState, action: ActionType) => {
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
      } else if (action.type === "position") {
        return { ...state, position: action.payload };
      } else if (action.type === "email") {
        return { ...state, email: action.payload };
      } else if (action.type === "reset") {
        return initialState;
      }
    },
    initialState
  );

  useEffect(() => {
    setToolbarTitle('Add Staff')
  }, [])

  const mutation = useMutation({
    mutationFn: insertStaff,
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
  };

  const handleErrorToastOpen = () => {
    setIsError(true);
  };

  const resetInputFields = () => {
    dispatch({ type: "reset", payload: null });
  };

  return (
    <section className={styles.mainCont}>
      <h2>Staff Details:</h2>
      <Form handleDispatch={handleDispatch} state={state} formType="staff" />
      <div className={styles.button}>
        <Button variant="contained" size="large" onClick={handleFormSubmit}>
          Add New Staff
        </Button>
      </div>
      <Toast isOpen={isSuccess} message={"New staff successfully added!"} onClose={handleSuccessToastClose}/>
      <Toast isOpen={isError} message={"Error encountered"} onClose={handleErrorToastClose} isError/>
    </section>
  );
}

export default AddStaffForm;
