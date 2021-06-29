import axios from 'axios';

// const BaseURL = "https://www.sonar32.com.mx"
const BaseURL = 'http://localhost:5000';

const byClients = async (filters) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  try {
    const resp = await axios.get(`${BaseURL}/v1/sellsreport/by_client`, {
      headers,
      params: filters,
    });

    if (resp.status === 200) {
      return resp.data.data;
    }

    return null;
  } catch (err) {
    return null;
  }
};

const SellReportsService = {
  byClients,
};

export default SellReportsService;