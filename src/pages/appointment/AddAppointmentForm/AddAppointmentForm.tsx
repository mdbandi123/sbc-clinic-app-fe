import {
  Button,
  Grid2,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { ChangeEventHandler, useEffect, useReducer, useState } from "react";
import {
  getPatientByIcNo,
  getPatientById,
  getPatientByName,
  insertPatient,
} from "../../../util/requests/patientRequest";
import styles from "./AddAppointmentForm.module.css";
import Form from "../../../components/form/Form";
import SearchField from "../../../components/input/SearchField";
import { insertAppointment } from "../../../util/requests/appointmentRequest";
import useStore from "../../../util/store/store";
import InitialDataScreen from "../../../components/table/InitialDataScreen/InitialDataScreen";
import NoDataScreen from "../../../components/table/NoDataFound/NoDataScreen";
import Toast from "../../../components/feedback/Toast";

type ActionType = {
  type: string;
  payload: string;
};

type PatientResponse = {
  patientId: number;
  name: string;
  icNo: string;
  gender: string;
  address: string;
  contactNo: string;
  registrationTime: string;
  profileImage: string;
};

const initialState = {
  remark: "",
  date: "",
}

function AddAppointmentForm() {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [patientDetails, setPatientDetails] = useState<
    PatientResponse | undefined | null
  >(null);
  const { setToolbarTitle } = useStore();
  const [state, dispatch] = useReducer(
    (state, action: ActionType) => {
      if (action.type === "remark") {
        return { ...state, remark: action.payload };
      } else if (action.type === "date") {
        return { ...state, date: action.payload };
      } else if (action.type === "reset") {
        return initialState;
      }
    },
    initialState
  );

  const mutation = useMutation({
    mutationFn: insertAppointment,
    onSuccess: (data) => {
      resetInputFields();
      handleSuccessToastOpen();
    },
    onError: (error) => {
      handleErrorToastOpen();
    },
  });

  useEffect(() => {
    setToolbarTitle("Create Appointment");
  }, []);

  const handleSearchTextChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setSearchText(e.target.value);
  };

  const handleDispatch = (action: ActionType) => {
    dispatch(action);
  };

  const handleFormSubmit = () => {
    const payload = {
      ...state,
      fkPatientId: patientDetails?.patientId,
    };
    mutation.mutate(payload);
  };

  const handleSearchSubmit = async () => {
    const response = getPatientByIcNo(searchText.trim());
    const data = await response;
    console.log(data[0]);
    setPatientDetails(data[0]);
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
      <div>
        <Typography sx={{ fontSize: "1.1em", marginBottom: "2em" }}>
          Please enter your IC No. to load your patient profile to begin you
          appointment creation. (Note: For first time patients, please proceed
          to our nurse bay to create your record first)
        </Typography>
        <Grid2 container spacing={3}>
          <Grid2 size={3}>
            <SearchField onChange={handleSearchTextChange} value={searchText} />
          </Grid2>
          <Grid2>
            <Button
              variant="contained"
              size="large"
              onClick={handleSearchSubmit}
            >
              Load Record
            </Button>
          </Grid2>
        </Grid2>
      </div>
      <div>
        {patientDetails === null && (
          <div className={styles.formCont}>
            <InitialDataScreen />
          </div>
        )}

        {patientDetails === undefined && (
          <div className={styles.formCont}>
            <NoDataScreen/>
          </div>
        )}
        {patientDetails !== null && patientDetails !== undefined && (
          <>
            <Grid2 container size={12} spacing={3} sx={{ marginTop: "1em" }}>
              <Grid2 size={12}>
                <h3>User Details</h3>
              </Grid2>
              <Grid2 size={6}>
                <TextField
                  disabled
                  id="outlined-required"
                  label="Full Name"
                  value={patientDetails.name}
                  sx={{ width: "100%" }}
                />
              </Grid2>
              <Grid2 size={3}>
                <TextField
                  disabled
                  id="outlined-required"
                  label="Gender"
                  value={patientDetails.gender}
                  sx={{ width: "100%" }}
                />
              </Grid2>
              <Grid2 size={6}>
                <TextField
                  disabled
                  id="outlined-required"
                  label="Address"
                  value={patientDetails.address}
                  sx={{ width: "100%" }}
                />
              </Grid2>
              <Grid2 size={3}>
                <TextField
                  disabled
                  id="outlined-required"
                  label="Contact No."
                  value={patientDetails.contactNo}
                  sx={{ width: "100%" }}
                />
              </Grid2>
            </Grid2>
            <Grid2 container spacing={3} size={12} sx={{ marginTop: "1em" }}>
              <Grid2 size={12}>
                <h3>Appointment Details</h3>
              </Grid2>
              <Grid2 size={12}>
                <Form
                  handleDispatch={handleDispatch}
                  state={state}
                  formType="appointment"
                />
              </Grid2>

              <div className={styles.button}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleFormSubmit}
                >
                  Add New Appointment
                </Button>
              </div>
            </Grid2>
          </>
        )}
      </div>
      <Toast isOpen={isSuccess} message={"Appointment successfully created!"} onClose={handleSuccessToastClose}/>
      <Toast isOpen={isError} message={"Error encountered"} onClose={handleErrorToastClose} isError/>
    </section>
  );
}

export default AddAppointmentForm;
