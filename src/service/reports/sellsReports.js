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

const byItems = async (filters) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `jwt ${localStorage.getItem('token')}`,
  };
  try {
    const resp = await axios.get(`${BaseURL}/v1/sellsreport/by_items`, {
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

const byServices = async (filters) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `jwt ${localStorage.getItem('token')}`,
  };
  try {
    const resp = await axios.get(`${BaseURL}/v1/sellsreport/by_services`, {
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
  byItems,
  byServices,
};

export default SellReportsService;
