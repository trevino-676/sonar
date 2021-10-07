import axios from 'axios';

const baseUrl = 'https://www.sonar32.com.mx';
 //const baseUrl = 'http://localhost:5000';

const headers = {
  'Content-Type': 'application/json',
};

const createCuenta = async (cuenta, token) => {
  const data = {
    ...cuenta,
  };
  const newHeader = { ...headers, Authorization: `jwt ${token}` };

  const resp = await axios.post(`${baseUrl}/v1/account/`, data, {
    headers: newHeader,
  });
  return resp;
};

const findCuentas = async (type, filters, token) => {
  let data = {};
  if (type && filters) {
    data = { type, filters };
  }
  const newHeader = {
    Authorization: `jwt ${token}`,
    'Content-Type': 'application/json',
  };
  const resp = await axios.get(`${baseUrl}/v1/account/by_user`, {
    headers: newHeader,
    params: data,
  });
  return resp;
};

const updateCuenta = async (company, token) => {
  const data = {
    company,
  };
  const newHeader = { ...headers, Authorization: `JWT ${token}` };
  const resp = await axios.put(`${baseUrl}/v1/account/`, data, {
    headers: newHeader,
  });
  return resp;
};

const deleteCuenta = async (id, token) => {
  const newHeader = { ...headers, Authorization: `JWT ${token}` };
  const resp = await axios.delete(`${baseUrl}/v1/account/${id}`, {
    headers: newHeader,
  });
  return resp;
};

const getCuentaByUser = async () => {
  const token = localStorage.getItem('token');
  const newHeaders = { ...headers, Authorization: `jwt ${token}` };
  try {
    const resp = await axios.get(`${baseUrl}/v1/account/by_user`, {
      headers: newHeaders,
    });
    if (resp.status !== 200) {
      return null;
    }
    return resp.data.data;
  } catch (e) {
    if (e.message.indexOf('401') > 0) {
      throw e;
    }
    return null;
  }
};

const CuentaService = {
  createCuenta,
  findCuentas,
  updateCuenta,
  deleteCuenta,
  getCuentaByUser,
};

export default CuentaService;
