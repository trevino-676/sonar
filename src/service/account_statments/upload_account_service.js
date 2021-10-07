import axios from 'axios';

// const BaseURL = 'http://localhost:8000';
const BaseURL = 'https://api.sonar32.com.mx';

const headers = {
  'Content-Type': 'application/json',
  Authorization: `jwt ${localStorage.getItem('token')}`,
};

const uploadAccountStatments = async (bank, file) => {
  const formData = new FormData();
  formData.append('file', file);
  try {
    const resp = await axios.post(`${BaseURL}/v1/upload/${bank}`, formData, {
      headers,
    });
    if (resp.status !== 200) {
      return null;
    }
    return resp.status;
  } catch (e) {
    return null;
  }
};

const uploadAccountStatmentsService = {
  uploadAccountStatments,
};

export default uploadAccountStatmentsService;
