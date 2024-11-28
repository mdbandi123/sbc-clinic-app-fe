import axios from "axios";
import { BASE_URL } from "../routes/routes";

export const insertReport = async ({params,formState}) => {
  console.log(`${BASE_URL}/api/report/insert/${params}`);
  const response = await axios.post(`${BASE_URL}/api/report/insert/${params}`, formState, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data;
}

export const getAllReports = async () => {
  const response = await axios.get(`${BASE_URL}/api/report/details/list/all`);
  return response.data;
}

export const getReportById = async (params) => {
  console.log(`${BASE_URL}/api/report/details/id/${params}`);
  const response = await axios.get(`${BASE_URL}/api/report/details/id/${params}`);
  return response.data;
}

export const getReportByIcNo = async (params) => {
  const response = await axios.get(`${BASE_URL}/api/report/details/icno/${params}`);
  return response.data;
}

export const getReportByName = async (params) => {
  const response = await axios.get(`${BASE_URL}/api/report/details/name/${params}`);
  return response.data;
}