import axios from "axios";
import { BASE_URL } from "../routes/routes";

export const insertMedCert = async (formState) => {
  const response = await axios.post(
    `${BASE_URL}/api/medical-certificate/insert`,
    formState,
    {
      responseType: 'blob',
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const blob = new Blob([response.data], { type: 'application/pdf' });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'MedicalCertificate.pdf'; 

  document.body.appendChild(link);
  
  link.click();

  document.body.removeChild(link);
};
