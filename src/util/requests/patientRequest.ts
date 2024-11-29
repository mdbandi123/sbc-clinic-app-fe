import axios from "axios";
import { BASE_URL } from "../routes/routes";


export const insertPatient = async (formState) => {
  const response = await axios.post(`${BASE_URL}/api/patient/insert`, formState, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data;
}

export const getAllPatients = async () => {
  const response = await axios.get(`${BASE_URL}/api/patient/details/list/all`);
  return response.data;
}

export const getPatientById = async (params) => {
  const response = await axios.get(`${BASE_URL}/api/patient/details/id/${params}`);
  return response.data;
}

export const getPatientByIcNo = async (params) => {
  const response = await axios.get(`${BASE_URL}/api/patient/details/icno/${params}`);
  return response.data;
}

export const getPatientByName = async (params) => {
  const response = await axios.get(`${BASE_URL}/api/patient/details/name/${params}`);
  return response.data;
}

export const updatePatient = async ({params,formState}) => {
  const response = await axios.patch(`${BASE_URL}/api/patient/update/${params}`, formState, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data;
}