import { Grid2, MenuItem, Button, SelectChangeEvent } from "@mui/material";
import SearchField from "../../../components/input/SearchField";
import SelectDropdown from "../../../components/input/SelectDropdown";
import DataTable, { Column } from "../../../components/table/DataTable";
import styles from "./AppointmentReport.module.css";
import { useEffect, useState } from "react";
import {
  getAppointmentByName,
  getAppointmentByIcNo,
  getAppointmentById,
  getAllAppointments,
} from "../../../util/requests/appointmentRequest";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { routes } from "../../../util/routes/routes";
import useStore from "../../../util/store/store";

const columns: readonly Column[] = [
  { id: "appointmentId", label: "Appointment ID", minWidth: 100 },
  { id: "name", label: "Name", minWidth: 100 },
  { id: "icNo", label: "IC No.", minWidth: 100 },
  {
    id: "date",
    label: "Date",
    minWidth: 100,
  },
  {
    id: "action",
    label: "Action",
    minWidth: 100,
  },
];

function AppointmentReport() {
  const [searchType, setSearchType] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [appointmentList, setAppointmentList] = useState([]);
  const navigate = useNavigate();
  const { setReportCreateFormData } = useStore();

  const { data, isSuccess, isFetched } = useQuery({
    queryKey: ["appointment"],
    queryFn: getAllAppointments,
    placeholderData: [],
  });

  useEffect(() => {
    if (isFetched) {
      setAppointmentList(data);
    }
  }, [isFetched]);

  const handleSearchByChange = (e: SelectChangeEvent) => {
    setSearchType(e.target.value);
  };

  const handleSearchTextChange = (e: SelectChangeEvent) => {
    setSearchText(e.target.value);
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
    }
    setAppointmentList(data);
  };

  const handleCreateReport = (payload) => {
    setReportCreateFormData(payload);
    navigate(routes.addReport);
  };

  return (
    <section className={styles.mainCont}>
      <h1>Create Report</h1>
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
        <DataTable
          rows={appointmentList}
          action={handleCreateReport}
          columns={columns}
          isVisitationTable={true}
        />
      </Grid2>
    </section>
  );
}

export default AppointmentReport;
