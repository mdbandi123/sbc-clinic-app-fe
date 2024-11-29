import axios from "axios";
import { BASE_URL } from "../routes/routes";

export const insertStaff = async (formState) => {
  const response = await axios.post(`${BASE_URL}/api/staff/insert`, formState, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const getAllStaff = async () => {
  const response = await axios.get(`${BASE_URL}/api/staff/details/list/all`);
  return response.data;
};

export const getStaffById = async (params) => {
  const response = await axios.get(
    `${BASE_URL}/api/staff/details/id/${params}`,
  );
  return response.data;
};

export const getStaffByIcNo = async (params) => {
  const response = await axios.get(
    `${BASE_URL}/api/staff/details/icno/${params}`,
  );
  return response.data;
};

export const getStaffByName = async (params) => {
  const response = await axios.get(
    `${BASE_URL}/api/staff/details/name/${params}`,
  );
  return response.data;
};

export const updateStaff = async ({ params, formState }) => {
  const response = await axios.patch(
    `${BASE_URL}/api/staff/update/${params}`,
    formState,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
};
