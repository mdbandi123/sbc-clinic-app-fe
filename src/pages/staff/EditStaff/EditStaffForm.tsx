import { Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useReducer, useState } from "react";
import { useNavigate } from "react-router";
import Toast from "../../../components/feedback/Toast";
import Form from "../../../components/form/Form";
import { updateStaff } from "../../../util/requests/staffRequest";
import { routes } from "../../../util/routes/routes";
import useStore from "../../../util/store/store";
import styles from "./EditStaffForm.module.css";

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

function EditStaffForm() {
  const { staffEditFormData, toggleStaffTrigger, setToolbarTitle, setIsSuccessfulStaffEdit } = useStore();
  const [isError, setIsError] = useState<boolean>(false);
  const navigate = useNavigate();
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
    staffEditFormData,
  );

  const mutation = useMutation({
    mutationFn: updateStaff,
    onSuccess: (data) => {
      toggleStaffTrigger();
      resetInputFields();
      setIsSuccessfulStaffEdit(true);
      navigate(routes.searchStaff);
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
      params: staffEditFormData.staffId,
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
      <h1>Edit Staff</h1>
      <Form handleDispatch={handleDispatch} state={state} formType="staff" />
      <div className={styles.button}>
        <Button variant="contained" size="large" onClick={handleFormSubmit}>
          Edit Staff
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

export default EditStaffForm;
