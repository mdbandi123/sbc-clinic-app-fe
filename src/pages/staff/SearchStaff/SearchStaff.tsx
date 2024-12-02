import {
  Button,
  Grid2,
  MenuItem,
  SelectChangeEvent
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Toast from "../../../components/feedback/Toast";
import SearchField from "../../../components/input/SearchField";
import SelectDropdown from "../../../components/input/SelectDropdown";
import DataTable, { Column } from "../../../components/table/DataTable";
import {
  getAllStaff,
  getStaffByIcNo,
  getStaffById,
  getStaffByName,
} from "../../../util/requests/staffRequest";
import { routes } from "../../../util/routes/routes";
import useStore from "../../../util/store/store";
import styles from "./SearchStaff.module.css";

type StaffResponse = {
  staffId: number;
  name: string;
  icNo: string;
  gender: string;
  address: string;
  contactNo: string;
  registrationTime: string;
  profileImage: string;
  position: string;
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
    id: "position",
    label: "Position",
    minWidth: 100,
  },
  {
    id: "action",
    label: "Action",
    minWidth: 100,
  },
];

function SearchStaff() {
  const [searchType, setSearchType] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [resetSearchToggle, setResetSearchToggle] = useState<boolean>(false);
  const { setStaffEditFormData, setIsSuccessfulStaffEdit, isSuccessfulStaffEdit, setToolbarTitle } = useStore();
  const navigate = useNavigate();
  const { data, isFetchedAfterMount } = useQuery({
    queryKey: ["staff"],
    queryFn: getAllStaff,
    placeholderData: [],
    refetchOnMount: "always"
  });
  const [staffList, setStaffList] = useState<StaffResponse[]>([]);

  useEffect(() => {
      setStaffList(data);
  }, [isFetchedAfterMount, resetSearchToggle]);

  useEffect(() => {
    setToolbarTitle('List Staff')
  },[])

  const handleSearchByChange = (e: SelectChangeEvent) => {
    setSearchType(e.target.value);
  };

  const handleSearchTextChange = (e: SelectChangeEvent) => {
    setSearchText(e.target.value);
  };

  const handleSearchSubmit = async () => {
    let data;
    if (searchType === "name") {
      const response = getStaffByName(searchText);
      data = await response;
    } else if (searchType === "icNo") {
      const response = getStaffByIcNo(searchText);
      data = await response;
    } else if (searchType === "id") {
      const response = getStaffById(searchText);
      data = await response;
    } else {
      return;
    }
    setStaffList(data);
  };

  const handleEditStaff = (data) => {
    setStaffEditFormData(data);
    navigate(routes.editStaff);
  };

  const handleResetToggle = () => {
    setResetSearchToggle((prev) => !prev);
  };

  const handleEditSuccessToastClose = () => {
    setIsSuccessfulStaffEdit(false);
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
            <MenuItem value="id">Staff ID</MenuItem>
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
          rows={staffList}
          action={handleEditStaff}
          columns={columns}
        />
      </Grid2>
      <Toast
        isOpen={isSuccessfulStaffEdit}
        message={"Staff details successfully changed!"}
        onClose={handleEditSuccessToastClose}
      />
    </section>
  );
}

export default SearchStaff;
