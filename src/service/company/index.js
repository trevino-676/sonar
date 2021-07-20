import axios from 'axios';

// const baseUrl = 'https://www.sonar32.com.mx';
const baseUrl = 'http://localhost:5000';

const headers = {
  'Content-Type': 'application/json',
};

const createCompany = async (company, token) => {
  const data = {
    company,
  };
  const newHeader = { ...headers, Authorization: `jwt ${token}` };

  const resp = await axios.post(`${baseUrl}/v1/company/`, data, {
    headers: newHeader,
  });
  return resp;
};

const findCompanies = async (type, filters, token) => {
  let data = {};
  if (type && filters) {
    data = { type, filters };
  }
  const newHeader = {
    Authorization: `jwt ${token}`,
    'Content-Type': 'application/json',
  };
  const resp = await axios.get(`${baseUrl}/v1/company/all`, {
    headers: newHeader,
    params: data,
  });
  return resp;
};

const updateCompany = async (company, token) => {
  const data = {
    company,
  };
  const newHeader = { ...headers, Authorization: `JWT ${token}` };
  const resp = await axios.put(`${baseUrl}/v1/company/`, data, {
    headers: newHeader,
  });
  return resp;
};

const deleteCompany = async (id, token) => {
  const newHeader = { ...headers, Authorization: `JWT ${token}` };
  const resp = await axios.delete(`${baseUrl}/v1/company/${id}`, {
    headers: newHeader,
  });
  return resp;
};

const getCompaniesByUser = async () => {
  const token = localStorage.getItem('token');
  const newHeaders = { ...headers, Authorization: `jwt ${token}` };
  try {
    const resp = await axios.get(`${baseUrl}/v1/company/by_user`, {
      headers: newHeaders,
    });
    if (resp.status !== 200) {
      return null;
    }
    return resp.data.data;
  } catch (e) {
    return null;
  }
};

const CompanyService = {
  createCompany,
  findCompanies,
  updateCompany,
  deleteCompany,
  getCompaniesByUser,
};

export default CompanyService;
