import axios from "axios";
import { BASE_URL } from "../routes/routes";

export const getQueueOfPatients = async () => {
  const response = await axios.get(`${BASE_URL}/api/queue/details/list`);
  return response.data;
};

export const getQueueOfPatientsNotCheckedIn = async () => {
  const response = await axios.get(
    `${BASE_URL}/api/queue/details/list/checkin/false`,
  );
  return response.data;
};

export const updateCheckIn = async ({ params, formState }) => {
  const response = await axios.patch(
    `${BASE_URL}/api/queue/update/checkin/${params}`,
    formState,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
};
