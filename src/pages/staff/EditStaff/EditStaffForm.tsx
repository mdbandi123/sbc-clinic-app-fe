import { useReducer } from "react";
import styles from "./EditStaffForm.module.css";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@mui/material";
import Form from "../../../components/form/Form";
import { insertStaff, updateStaff } from "../../../util/requests/staffRequest";
import useStore from "../../../util/store/store";

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

function EditStaffForm() {
  const { staffEditFormData } = useStore();
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
      }
    },
    staffEditFormData,
  );

  const mutation = useMutation({
    mutationFn: updateStaff,
    onSuccess: (data) => {
      console.log("staff updated:", data);
    },
    onError: (error) => {
      console.error("Error updating staff:", error);
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

  return (
    <section className={styles.mainCont}>
      <h1>Edit Staff</h1>
      <Form handleDispatch={handleDispatch} state={state} formType="staff" />
      <div className={styles.button}>
        <Button variant="contained" size="large" onClick={handleFormSubmit}>
          Edit Staff
        </Button>
      </div>
    </section>
  );
}

export default EditStaffForm;
