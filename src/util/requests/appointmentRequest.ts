import axios from "axios";
import { BASE_URL } from "../routes/routes";

export const insertAppointment = async (formState) => {
  const response = await axios.post(`${BASE_URL}/api/appointment/insert`, formState, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data;
}