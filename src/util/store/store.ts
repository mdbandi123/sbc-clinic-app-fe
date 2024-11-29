import { create } from "zustand";

const useStore = create((set) => ({
  patientEditFormData: {},
  staffEditFormData: {},
  reportCreateFormData: {},
  mcCreateFormData: {},
  toolbarTitle: 'Home',
  patientTrigger: false,
  isSuccessfulPatientEdit: false,
  isSuccessfulPatientAdd: false,
  setPatientEditFormData: (newData) => set({ patientEditFormData: newData }),
  setStaffEditFormData: (newData) => set({ staffEditFormData: newData }),
  setReportCreateFormData: (newData) => set({ reportCreateFormData: newData }),
  setMcCreateFormData: (newData) => set({ mcCreateFormData: newData }),
  setToolbarTitle: (newData) => set({toolbarTitle: newData}),
  togglePatientTrigger: () => set((state) => ({patientTrigger: !state.patientTrigger})),
  setIsSuccessfulPatientEdit: (newData) => set({isSuccessfulPatientEdit: newData}),
  setIsSuccessfulPatientAdd: (newData) => set({isSuccessfulPatientAdd: newData})
}));

export default useStore;

