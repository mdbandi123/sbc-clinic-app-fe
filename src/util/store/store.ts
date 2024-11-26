import {create} from 'zustand';

const useStore = create((set) => ({
  editFormData: {},
  setEditFormData: (newData) => set({editFormData: newData})
}));

export default useStore;