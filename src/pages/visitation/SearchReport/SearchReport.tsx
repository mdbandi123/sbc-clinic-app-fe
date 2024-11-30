import { Grid2, MenuItem, Button, SelectChangeEvent } from "@mui/material";
import SearchField from "../../../components/input/SearchField";
import SelectDropdown from "../../../components/input/SelectDropdown";
import DataTable, { Column } from "../../../components/table/DataTable";
import styles from "./SearchReport.module.css";
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
import {
  getAllReports,
  getReportByIcNo,
  getReportById,
  getReportByName,
} from "../../../util/requests/reportRequest";

const columns: readonly Column[] = [
  { id: "reportId", label: "Report ID", minWidth: 100 },
  { id: "appointmentId", label: "Appointment ID", minWidth: 100 },
  { id: "name", label: "Name", minWidth: 100 },
  { id: "icNo", label: "IC No.", minWidth: 100 },
  {
    id: "date",
    label: "Date",
    minWidth: 100,
  },
  {
    id: "details",
    label: "Details",
    minWidth: 100,
  },
];

function SearchReport() {
  const [searchType, setSearchType] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [appointmentList, setAppointmentList] = useState([]);
  const navigate = useNavigate();
  const { setReportCreateFormData, setToolbarTitle } = useStore();
  const [resetSearchToggle, setResetSearchToggle] = useState<boolean>(false);

  const { data, isSuccess, isFetched } = useQuery({
    queryKey: ["report"],
    queryFn: getAllReports,
    placeholderData: [],
  });

  useEffect(() => {
    if (isFetched) {
      setAppointmentList(data);
    }
  }, [isFetched, resetSearchToggle]);

  useEffect(() => {
    setToolbarTitle('List Reports')
  }, [])

  const handleSearchByChange = (e: SelectChangeEvent) => {
    setSearchType(e.target.value);
  };

  const handleSearchTextChange = (e: SelectChangeEvent) => {
    setSearchText(e.target.value);
  };

  const handleSearchSubmit = async () => {
    let data;
    if (searchType === "name") {
      const response = getReportByName(searchText);
      data = await response;
    } else if (searchType === "icNo") {
      const response = getReportByIcNo(searchText);
      data = await response;
    } else if (searchType === "id") {
      const response = getReportById(searchText);
      data = await response;
    } else {
      return;
    }
    setAppointmentList(data);
  };

  const handleCreateReport = (payload) => {
    setReportCreateFormData(payload);
    navigate(routes.addReport);
  };

  const handleResetToggle = () => {
    setResetSearchToggle((prev) => !prev);
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
            <MenuItem value="id">Report ID</MenuItem>
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
          <Button variant="contained" size="large" onClick={handleResetToggle}>
            Reset
          </Button>
        </Grid2>
        <DataTable
          rows={appointmentList}
          action={handleCreateReport}
          columns={columns}
        />
      </Grid2>
    </section>
  );
}

export default SearchReport;
