import { Search } from "@mui/icons-material";
import {
  Button,
  Grid2,
  InputAdornment,
  MenuItem,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import SearchField from "../../../components/input/SearchField";
import SelectDropdown from "../../../components/input/SelectDropdown";
import styles from "./SearchAppointment.module.css";
import { useEffect, useState } from "react";
import DataTable, { Column } from "../../../components/table/DataTable";
import useStore from "../../../util/store/store";
import { useNavigate } from "react-router";
import { BASE_URL, routes } from "../../../util/routes/routes";
import {
  getStaffByIcNo,
  getStaffById,
  getStaffByName,
  getAllStaff,
} from "../../../util/requests/staffRequest";
import { useQuery } from "@tanstack/react-query";
import {
  getAllAppointments,
  getAppointmentByIcNo,
  getAppointmentById,
  getAppointmentByName,
  updateAppointmentArrivalStatus,
  updateAppointmentConfirmationStatus,
} from "../../../util/requests/appointmentRequest";
import dayjs from "dayjs";
import { formatDate } from "../../../util/functions/date";
import useSSE from "../../../util/hooks/useSSE";

type AppointmentResponse = {
  appointmentId: number;
  name: string;
  icNo: string;
  date: string;
  remark: string;
};

const columns: readonly Column[] = [
  { id: "name", label: "Name", minWidth: 100 },
  { id: "icNo", label: "IC No.", minWidth: 100 },
  {
    id: "date",
    label: "Date",
    minWidth: 100,
  },
  {
    id: "remark",
    label: "Remark",
    minWidth: 100,
  },
  {
    id: "action",
    label: "Action",
    minWidth: 100,
  },
];

function SearchAppointment() {
  const {aptArrivalTrigger, aptConfTrigger} = useSSE(`${BASE_URL}/api/sse/subscribe`);
  const [searchType, setSearchType] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [isCompletedShown, setIsCompletedShown] = useState<boolean>(false);
  const {setToolbarTitle} = useStore()

  const { data, refetch, isFetched } = useQuery({
    queryKey: ["appointment", aptArrivalTrigger, aptConfTrigger],
    queryFn: getAllAppointments,
    placeholderData: [],
  });
  const [appointmentList, setAppointmentList] = useState<AppointmentResponse[]>(
    []
  );

  useEffect(() => {
    if (isFetched) {
      setAppointmentList(data);
    }
  }, [isFetched]);

  
  useEffect(()=>{
    refetch();
  }, [aptArrivalTrigger, aptConfTrigger])

  useEffect(() => {
    setToolbarTitle('List Appointments')
  }, [])

  const handleSearchByChange = (e: SelectChangeEvent) => {
    setSearchType(e.target.value);
  };

  const handleSearchTextChange = (e: SelectChangeEvent) => {
    setSearchText(e.target.value);
  };

  const handleCompeletedShownChange = () => {
    setIsCompletedShown((prev) => !prev);
  };

  const handleSearchSubmit = async () => {
    let data;
    if (searchType === "name") {
      const response = getAppointmentByName(searchText);
      data = await response;
    } else if (searchType === "icNo") {
      const response = getAppointmentByIcNo(searchText);
      data = await response;
    } else if (searchType === "id") {
      const response = getAppointmentById(searchText);
      data = await response;
    } else {
      return;
    }
    setAppointmentList(data);
  };

  const handleEditAppointmentArrivalStatus = async (payload) => {
    const response = updateAppointmentArrivalStatus({
      params: payload.appointmentId,
      formState: { isArrival: true, fkPatientId: payload.patientId },
    });
    const data = await response;
  };

  const handleEditAppointmentConfirmationStatus = async (payload) => {
    const response = updateAppointmentConfirmationStatus({
      params: payload.appointmentId,
      formState: {
        isConfirmed: true,
        fkPatientId: payload.patientId,
        date: payload.date,
        remark: payload.remark,
        appointmentId: payload.appointmentId,
      },
    });
    const data = await response;
  };

  return (
    <section className={styles.mainCont}>
      <Grid2 container spacing={3}>
        <Grid2 size={2}>
          <SelectDropdown
            label={"Search by"}
            onChange={handleSearchByChange}
            value={searchType}
            isRequired={true}
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="icNo">IC Number</MenuItem>
            <MenuItem value="id">Appointment ID</MenuItem>
          </SelectDropdown>
        </Grid2>
        <Grid2 size={3}>
          <SearchField onChange={handleSearchTextChange} value={searchText} />
        </Grid2>
        <Grid2>
          <Button variant="contained" size="large" onClick={handleSearchSubmit}>
            Search
          </Button>
        </Grid2>
        <Grid2>
          <Button
            variant="contained"
            size="large"
            onClick={handleCompeletedShownChange}
          >
            Show Completed
          </Button>
        </Grid2>
        <DataTable
          rows={appointmentList}
          action={handleEditAppointmentArrivalStatus}
          secondaryAction={handleEditAppointmentConfirmationStatus}
          columns={columns}
          isAppointmentTable={true}
          isCompletedShown={isCompletedShown}
        />
      </Grid2>
    </section>
  );
}

export default SearchAppointment;
