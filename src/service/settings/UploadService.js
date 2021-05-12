import axios from "axios";

const baseUrl = "https://www.sonar32.com.mx"

const upload = async (file, rfc) => {
  const formData = new FormData();
  formData.append('file', file);

  const resp = await axios.post(`${baseUrl}/v1/user/${rfc}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return resp;
};

const setFielPassword = async (rfc, fielPassword) => {
  const data = {
    rfc,
    fiel: fielPassword,
  }

  const headers = {
    'Content-Type': 'application/json',
  };

  const resp = await axios.post(`${baseUrl}/v1/user/fiel`, data, { headers });
  return resp;
};

const UploadService = {
  upload,
  setFielPassword,
};

export default UploadService;
