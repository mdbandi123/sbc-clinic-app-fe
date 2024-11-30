import { Button, Grid2, TextField } from "@mui/material";
import useStore from "../../../util/store/store";
import styles from "./AddReportForm.module.css";
import Form from "../../../components/form/Form";
import { useReducer, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllStaff } from "../../../util/requests/staffRequest";
import { insertReport } from "../../../util/requests/reportRequest";
import Toast from "../../../components/feedback/Toast";

const initialState = {
  details: "",
  staff: "",
};

function AddReportForm() {
  const { reportCreateFormData } = useStore();
  const [isPostSuccess, setIsPostSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const { data, isSuccess, isFetched } = useQuery({
    queryKey: ["staff"],
    queryFn: getAllStaff,
    placeholderData: [],
  });

  const mutation = useMutation({
    mutationFn: insertReport,
    onSuccess: (data) => {
      resetInputFields();
      handleSuccessToastOpen();
    },
    onError: (error) => {
      handleErrorToastOpen();
    },
  });

  const [state, dispatch] = useReducer((state, action: ActionType) => {
    if (action.type === "details") {
      return { ...state, details: action.payload };
    } else if (action.type === "staff") {
      return { ...state, staff: action.payload };
    } else if (action.type === "reset") {
      return initialState;
    }
  }, initialState);

  const handleSubmit = () => {
    const payload = {
      details: state.details,
      fkStaffId: parseInt(state.staff),
    };
    mutation.mutate({
      params: reportCreateFormData.appointmentId,
      formState: payload,
    });
  };

  const handleSuccessToastClose = () => {
    setIsPostSuccess(false);
  };

  const handleSuccessToastOpen = () => {
    setIsPostSuccess(true);
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
      <Grid2 container size={12} spacing={3}>
        <Grid2 size={12}>
          <h3>User Details</h3>
        </Grid2>
        <Grid2 size={6}>
          <TextField
            disabled
            id="outlined-required"
            label="Full Name"
            value={reportCreateFormData.name}
            sx={{ width: "100%" }}
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            disabled
            id="outlined-required"
            label="IC No."
            value={reportCreateFormData.icNo}
            sx={{ width: "100%" }}
          />
        </Grid2>
      </Grid2>
      <Grid2 container spacing={3} size={12}>
        <Grid2 size={12}>
          <h3>Report Details</h3>
        </Grid2>
        <Grid2 size={12}>
          <Form
            handleDispatch={dispatch}
            state={state}
            formType="report"
            staffChoices={data}
          />
        </Grid2>

        <div className={styles.button}>
          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
            className={styles.button}
          >
            Create New Report
          </Button>
        </div>
      </Grid2>
      <Toast
        isOpen={isPostSuccess}
        message={"Report successfully created!"}
        onClose={handleSuccessToastClose}
      />
      <Toast
        isOpen={isError}
        message={"Error encountered"}
        onClose={handleErrorToastClose}
        isError
      />
    </section>
  );
}

export default AddReportForm;
