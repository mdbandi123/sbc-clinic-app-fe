import { Button, Grid2, TextField } from "@mui/material";
import useStore from "../../../util/store/store";
import styles from "./AddReportForm.module.css"
import Form from "../../../components/form/Form";
import { useReducer } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllStaff } from "../../../util/requests/staffRequest";
import { insertReport } from "../../../util/requests/reportRequest";

function AddReportForm() {
  const {reportCreateFormData} = useStore();
  const { data, isSuccess, isFetched } = useQuery({
    queryKey: ['staff'],
    queryFn: getAllStaff,
    placeholderData: [],
  });

  const mutation = useMutation({
    mutationFn: insertReport,
    onSuccess: (data) => {
      console.log('patient created:', data);
    },
    onError: (error) => {
      console.error('Error creating patient:', error);
    }
  });

  const [state, dispatch] = useReducer((state, action:ActionType) => {
    if(action.type === 'details'){
      return {...state, details:action.payload};
    } else if(action.type === 'staff'){
      return {...state, staff:action.payload};
    }
  }, {
    details: '',
    staff: ''
  });
  


  const handleSubmit = () => {
    const payload = {details: state.details, fkStaffId: parseInt(state.staff)};
    mutation.mutate({params: reportCreateFormData.appointmentId, formState: payload});
  }

  return(
    <section>
      <h1>Create New Report</h1>
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
                sx={{width:'100%'}}
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                disabled
                id="outlined-required"
                label="IC No."
                value={reportCreateFormData.icNo}
                sx={{width:'100%'}}
              />
            </Grid2>
          </Grid2>
          <Grid2 container spacing={3} size={12}>
            <Grid2 size={12}>
              <h3>Report Details</h3>
            </Grid2>
            <Grid2 size={12}>
              <Form handleDispatch={dispatch} state={state} formType="report" staffChoices={data}/>
            </Grid2>

            <div className={styles.button}>
              <Button variant="contained" size="large" onClick={handleSubmit}>Create New Report</Button>
            </div>
          </Grid2>
    </section>
  )
}

export default AddReportForm;