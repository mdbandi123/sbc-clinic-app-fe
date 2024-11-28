export const BASE_URL = "http://localhost:8080";

const patientRoutes = {
  addPatient: "/patient/add",
  searchPatient: "/patient/details",
  editPatient: "/patiend/details/edit",
};

const staffRoutes = {
  addStaff: "/staff/add",
  searchStaff: "/staff/details",
  editStaff: "/staff/details/edit",
};

const appointmentRoutes = {
  addAppointment: "/appointment/add",
  searchAppointment: "/appointment/details",
};

const visitationRoutes = {
  appointmentReport: "/visitation/report/details",
  addReport: "/visitation/report/add"
};

export const routes = {
  home: "/",
  ...patientRoutes,
  ...staffRoutes,
  ...appointmentRoutes,
  ...visitationRoutes,
};
