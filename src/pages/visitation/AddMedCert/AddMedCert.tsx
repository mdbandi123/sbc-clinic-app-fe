import {
  Button,
  Grid2,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useReducer, useState } from "react";
import {
  getPatientByIcNo,
  getPatientById,
  getPatientByName,
  insertPatient,
} from "../../../util/requests/patientRequest";
import styles from "./AddMedCert.module.css";
import Form from "../../../components/form/Form";
import SearchField from "../../../components/input/SearchField";
import { insertAppointment } from "../../../util/requests/appointmentRequest";
import { insertMedCert } from "../../../util/requests/medicalCertificateRequest";
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
  reason: "",
  date: "",
  day: "",
};

function AddMedCert() {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const { setToolbarTitle } = useStore();
  const [searchText, setSearchText] = useState<string>("");
  const [patientDetails, setPatientDetails] = useState<
    PatientResponse | undefined | null
  >(null);
  const [state, dispatch] = useReducer((state, action: ActionType) => {
    if (action.type === "reason") {
      return { ...state, reason: action.payload };
    } else if (action.type === "date") {
      return { ...state, date: action.payload };
    } else if (action.type === "day") {
      return { ...state, day: action.payload };
    } else if (action.type === "reset") {
      return initialState;
    }
  }, initialState);

  useEffect(() => {
    setToolbarTitle("Generate Medical Certificates");
  }, []);

  const mutation = useMutation({
    mutationFn: insertMedCert,
    onSuccess: (data) => {
      resetInputFields();
      handleSuccessToastOpen();
    },
    onError: (error) => {
      handleErrorToastOpen();
    },
  });

  const handleSearchTextChange = (e: SelectChangeEvent) => {
    setSearchText(e.target.value);
  };

  const handleDispatch = (action: ActionType) => {
    dispatch(action);
  };

  const handleFormSubmit = () => {
    const payload = {
      reason: state.reason,
      fkPatientId: patientDetails?.patientId,
      startDate: state.date,
      day: state.day,
    };
    mutation.mutate(payload);
  };

  const handleSearchSubmit = async () => {
    const response = getPatientByName(searchText.trim());
    const data = await response;
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
          Enter your patient's name below to load details.
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
              Search
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
            <NoDataScreen />
          </div>
        )}
        {patientDetails !== null && patientDetails !== undefined && (
          <>
            <Grid2 container size={12} spacing={3}>
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
            <Grid2 container spacing={3} size={12}>
              <Grid2 size={12}>
                <h3>Appointment Details</h3>
              </Grid2>
              <Grid2 size={12}>
                <Form
                  handleDispatch={handleDispatch}
                  state={state}
                  formType="medcert"
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
      <Toast isOpen={isSuccess} message={"Medical certificate successfully generated!"} onClose={handleSuccessToastClose}/>
      <Toast isOpen={isError} message={"Error encountered"} onClose={handleErrorToastClose} isError/>
    </section>
  );
}

export default AddMedCert;
