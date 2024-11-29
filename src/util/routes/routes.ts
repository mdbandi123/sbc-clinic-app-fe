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
  appointmentReport: "/visitation/report",
  addReport: "/visitation/report/add",
  searchReport: "/visitation/report/details",
  addMc: "/visitation/medical-certificate/add",
};

export const routes = {
  home: "/",
  ...patientRoutes,
  ...staffRoutes,
  ...appointmentRoutes,
  ...visitationRoutes,
};
