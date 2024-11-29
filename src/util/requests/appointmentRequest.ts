import axios from "axios";
import { BASE_URL } from "../routes/routes";

export const insertAppointment = async (formState) => {
  const response = await axios.post(
    `${BASE_URL}/api/appointment/insert`,
    formState,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
};

export const getAllAppointments = async () => {
  const response = await axios.get(
    `${BASE_URL}/api/appointment/details/list/all`,
  );
  return response.data;
};

export const getAppointmentById = async (params) => {
  const response = await axios.get(
    `${BASE_URL}/api/appointment/details/id/${params}`,
  );
  return response.data;
};

export const getAppointmentByIcNo = async (params) => {
  const response = await axios.get(
    `${BASE_URL}/api/appointment/details/icno/${params}`,
  );
  return response.data;
};

export const getAppointmentByName = async (params) => {
  const response = await axios.get(
    `${BASE_URL}/api/appointment/details/name/${params}`,
  );
  return response.data;
};

export const updateAppointmentArrivalStatus = async ({ params, formState }) => {
  const response = await axios.patch(
    `${BASE_URL}/api/appointment/update/arrival/${params}`,
    formState,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
};

export const updateAppointmentConfirmationStatus = async ({
  params,
  formState,
}) => {
  const response = await axios.patch(
    `${BASE_URL}/api/appointment/update/confirmation/${params}`,
    formState,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
};
