import { Route, Routes } from "react-router";
import AddAppointmentForm from "../../pages/appointment/AddAppointmentForm/AddAppointmentForm";
import SearchAppointment from "../../pages/appointment/SearchAppointment/SearchAppointment";
import AddPatientForm from "../../pages/patient/AddPatientForm/AddPatientForm";
import EditPatientForm from "../../pages/patient/EditPatientForm/EditPatientForm";
import SearchPatient from "../../pages/patient/SearchPatient/SearchPatient";
import QueueDashboard from "../../pages/queue/QueueDashboard/QueueDashboard";
import AddStaffForm from "../../pages/staff/AddStaffForm/AddStaffForm";
import EditStaffForm from "../../pages/staff/EditStaff/EditStaffForm";
import SearchStaff from "../../pages/staff/SearchStaff/SearchStaff";
import AddMedCert from "../../pages/visitation/AddMedCert/AddMedCert";
import AddReportForm from "../../pages/visitation/AddReportForm/AddReportForm";
import AppointmentReport from "../../pages/visitation/AppointmentReport/AppointmentReport";
import SearchReport from "../../pages/visitation/SearchReport/SearchReport";
import { routes } from "./routes";

function AppRoutes() {
  return (
    <Routes>
      {/* declare routes here */}
      <Route path={routes.home} element={<QueueDashboard />} />
      <Route path={routes.addPatient} element={<AddPatientForm />} />
      <Route path={routes.addStaff} element={<AddStaffForm />} />
      <Route path={routes.searchPatient} element={<SearchPatient />} />
      <Route path={routes.editPatient} element={<EditPatientForm />} />
      <Route path={routes.searchStaff} element={<SearchStaff />} />
      <Route path={routes.editStaff} element={<EditStaffForm />} />
      <Route path={routes.addAppointment} element={<AddAppointmentForm />} />
      <Route path={routes.searchAppointment} element={<SearchAppointment />} />
      <Route path={routes.appointmentReport} element={<AppointmentReport />} />
      <Route path={routes.addReport} element={<AddReportForm />} />
      <Route path={routes.searchReport} element={<SearchReport />} />
      <Route path={routes.addMc} element={<AddMedCert />} />
    </Routes>
  );
}

export default AppRoutes;
