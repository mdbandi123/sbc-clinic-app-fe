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