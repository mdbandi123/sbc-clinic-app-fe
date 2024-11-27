import { create } from "zustand";

const useStore = create((set) => ({
  patientEditFormData: {},
  staffEditFormData: {},
  setPatientEditFormData: (newData) => set({ patientEditFormData: newData }),
  setStaffEditFormData: (newData) => set({ staffEditFormData: newData }),
}));

export default useStore;
