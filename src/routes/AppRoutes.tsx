import { Route, Routes } from "react-router";
import QueueDashboard from "../pages/queue/QueueDashboard";
import { routes } from "./routes";
import PatientForm from "../pages/patient/PatientForm";

function AppRoutes(){
  return(
    <Routes>
      {/* declare routes here */}
      <Route path={routes.home} element={<QueueDashboard/>}/>
      <Route path={routes.addPatient} element={<PatientForm/>}/>
    </Routes>
  )
}

export default AppRoutes;