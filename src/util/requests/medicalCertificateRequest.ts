import axios from "axios";
import { BASE_URL } from "../routes/routes";


export const insertMedCert = async (formState) => {
  const response = await axios.post(`${BASE_URL}/api/medical-certificate/insert`, formState, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data;
}