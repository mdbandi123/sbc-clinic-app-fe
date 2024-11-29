import { create } from "zustand";

const useStore = create((set) => ({
  patientEditFormData: {},
  staffEditFormData: {},
  reportCreateFormData: {},
  mcCreateFormData: {},
  toolbarTitle: 'Home',
  setPatientEditFormData: (newData) => set({ patientEditFormData: newData }),
  setStaffEditFormData: (newData) => set({ staffEditFormData: newData }),
  setReportCreateFormData: (newData) => set({ reportCreateFormData: newData }),
  setMcCreateFormData: (newData) => set({ mcCreateFormData: newData }),
  setToolbarTitle: (newData) => set({toolbarTitle: newData})
}));

export default useStore;
