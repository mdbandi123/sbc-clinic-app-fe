import axios from "axios";
import { BASE_URL } from "../routes/routes";


export const insertStaff = async (formState) => {
  const response = await axios.post(`${BASE_URL}/api/staff/insert`, formState, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  return response.data;
}