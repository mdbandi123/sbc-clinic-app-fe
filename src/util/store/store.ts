import { create } from "zustand";

const useStore = create((set) => ({
  patientEditFormData: {},
  staffEditFormData: {},
  reportCreateFormData: {},
  mcCreateFormData: {},
  setPatientEditFormData: (newData) => set({ patientEditFormData: newData }),
  setStaffEditFormData: (newData) => set({ staffEditFormData: newData }),
  setReportCreateFormData: (newData) => set({ reportCreateFormData: newData }),
  setMcCreateFormData: (newData) => set({ mcCreateFormData: newData }),
}));

export default useStore;
