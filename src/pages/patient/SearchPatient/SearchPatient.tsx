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
import styles from "./SearchPatient.module.css";
import { useEffect, useState } from "react";
import {
  getAllPatients,
  getPatientByIcNo,
  getPatientById,
  getPatientByName,
} from "../../../util/requests/patientRequest";
import DataTable, { Column } from "../../../components/table/DataTable";
import useStore from "../../../util/store/store";
import { useNavigate } from "react-router";
import { routes } from "../../../util/routes/routes";
import { useQuery } from "@tanstack/react-query";

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

const columns: readonly Column[] = [
  { id: "name", label: "Name", minWidth: 100 },
  { id: "icNo", label: "IC No.", minWidth: 100 },
  {
    id: "gender",
    label: "Gender",
    minWidth: 50,
  },
  {
    id: "address",
    label: "Address",
    minWidth: 100,
  },
  {
    id: "contactNo",
    label: "Contact No.",
    minWidth: 100,
  },
  {
    id: "email",
    label: "Email",
    minWidth: 100,
  },
  {
    id: "action",
    label: "Action",
    minWidth: 100,
  },
];

function SearchPatient() {
  const [searchType, setSearchType] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const { setPatientEditFormData, patientEditFormData } = useStore();
  const navigate = useNavigate();
  const { data, isFetched } = useQuery({
    queryKey: ["patient"],
    queryFn: getAllPatients,
  });
  const [patientList, setPatientList] = useState<PatientResponse[]>([]);

  useEffect(() => {
    if (isFetched) {
      setPatientList(data);
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
      const response = getPatientByName(searchText);
      data = await response;
    } else if (searchType === "icNo") {
      const response = getPatientByIcNo(searchText);
      data = await response;
    } else if (searchType === "id") {
      const response = getPatientById(searchText);
      data = await response;
    }
    setPatientList(data);
  };

  const handleEditPatient = (data) => {
    setPatientEditFormData(data);
    navigate(routes.editPatient);
  };

  return (
    <section className={styles.mainCont}>
      <h1>Search Patient</h1>
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
            <MenuItem value="id">Patient ID</MenuItem>
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
          rows={patientList}
          action={handleEditPatient}
          columns={columns}
        />
      </Grid2>
    </section>
  );
}

export default SearchPatient;
