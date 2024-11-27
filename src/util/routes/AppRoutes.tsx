import { Route, Routes } from "react-router";
import QueueDashboard from "../../pages/queue/QueueDashboard";
import { routes } from "./routes";
import AddPatientForm from "../../pages/patient/AddPatientForm/AddPatientForm";
import SearchPatient from "../../pages/patient/SearchPatient/SearchPatient";
import EditPatientForm from "../../pages/patient/EditPatientForm/EditPatientForm";
import AddStaffForm from "../../pages/staff/AddStaffForm/AddStaffForm";
import SearchStaff from "../../pages/staff/SearchStaff/SearchStaff";
import EditStaffForm from "../../pages/staff/EditStaff/EditStaffForm";

function AppRoutes(){
  return(
    <Routes>
      {/* declare routes here */}
      <Route path={routes.home} element={<QueueDashboard/>}/>
      <Route path={routes.addPatient} element={<AddPatientForm/>}/>
      <Route path={routes.addStaff} element={<AddStaffForm/>}/>
      <Route path={routes.searchPatient} element={<SearchPatient/>}/>
      <Route path={routes.editPatient} element={<EditPatientForm/>}/>
      <Route path={routes.searchStaff} element={<SearchStaff/>}/>
      <Route path={routes.editStaff} element={<EditStaffForm/>}/>
    </Routes>
  )
}

export default AppRoutes;