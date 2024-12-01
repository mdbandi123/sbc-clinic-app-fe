import { Button, Grid2, MenuItem, SelectChangeEvent } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { ChangeEventHandler, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import SearchField from "../../../components/input/SearchField";
import SelectDropdown from "../../../components/input/SelectDropdown";
import DataTable, { Column } from "../../../components/table/DataTable";
import useSSE from "../../../util/hooks/useSSE";
import {
  getAllPatients,
  getPatientByIcNo,
  getPatientById,
  getPatientByName,
} from "../../../util/requests/patientRequest";
import { BASE_URL, routes } from "../../../util/routes/routes";
import useStore from "../../../util/store/store";
import styles from "./SearchPatient.module.css";
import Toast from "../../../components/feedback/Toast";

type PatientResponse = {
  patientId: number;
  name: string;
  icNo: string;
  gender: string;
  address: string;
  contactNo: string;
  registrationTime: string;
  email: string;
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
  const [resetSearchToggle, setResetSearchToggle] = useState<boolean>(false);
  const {
    setPatientEditFormData,
    setToolbarTitle,
    patientTrigger,
    isSuccessfulPatientEdit,
    setIsSuccessfulPatientEdit,
    isSuccessfulPatientAdd,
    setIsSuccessfulPatientAdd,
  } = useStore();
  const navigate = useNavigate();
  const { data, isFetchedAfterMount } = useQuery({
    queryKey: ["patient"],
    queryFn: getAllPatients,
    initialData: [],
    refetchOnMount: "always"
  });
  const [patientList, setPatientList] = useState<PatientResponse[]>([]);

  useEffect(() => {
    setPatientList(data);
  }, [isFetchedAfterMount, resetSearchToggle]);

  useEffect(() => {
    setToolbarTitle("Search Patient");
  }, []);

  const handleSearchByChange = (e: SelectChangeEvent) => {
    setSearchType(e.target.value);
  };

  const handleSearchTextChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
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
    } else {
      return;
    }
    setPatientList(data);
  };

  const handleEditPatient = (data: PatientResponse) => {
    setPatientEditFormData(data);
    navigate(routes.editPatient);
  };

  const handleResetToggle = () => {
    setResetSearchToggle((prev) => !prev);
  };

  const handleEditSuccessToastClose = () => {
    setIsSuccessfulPatientEdit(false);
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
        <Grid2>
          <Button variant="contained" size="large" onClick={handleResetToggle}>
            Reset
          </Button>
        </Grid2>
        <DataTable
          rows={patientList}
          action={handleEditPatient}
          columns={columns}
        />
      </Grid2>
      <Toast
        isOpen={isSuccessfulPatientEdit}
        message={"Patient details successfully changed!"}
        onClose={handleEditSuccessToastClose}
      />
    </section>
  );
}

export default SearchPatient;
