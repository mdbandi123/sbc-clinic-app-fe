import { Route, Routes } from "react-router";
import QueueDashboard from "../../pages/queue/QueueDashboard";
import { routes } from "./routes";
import AddPatientForm from "../../pages/patient/AddPatientForm/AddPatientForm";
import StaffForm from "../../pages/staff/StaffForm";
import SearchPatient from "../../pages/patient/SearchPatient/SearchPatient";
import EditPatientForm from "../../pages/patient/EditPatientForm/EditPatientForm";

function AppRoutes(){
  return(
    <Routes>
      {/* declare routes here */}
      <Route path={routes.home} element={<QueueDashboard/>}/>
      <Route path={routes.addPatient} element={<AddPatientForm/>}/>
      <Route path={routes.addStaff} element={<StaffForm/>}/>
      <Route path={routes.searchPatient} element={<SearchPatient/>}/>
      <Route path={routes.editPatient} element={<EditPatientForm/>}/>
    </Routes>
  )
}

export default AppRoutes;