import axios from 'axios';

const BaseURL = 'https://www.sonar32.com.mx';

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

const totalSells = async (companyRfc, fromDate, toDate) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `jwt ${localStorage.getItem('token')}`,
  };
  const filters = {
    'datos.Rfc': companyRfc,
    from_date: fromDate,
    to_date: toDate,
  };
  try {
    const resp = await axios.get(`${BaseURL}/v1/sellsreport/total`, {
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

const detailedSells = async (companyRfc, fromDate, toDate) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `jwt ${localStorage.getItem('token')}`,
  };
  const params = {
    'datos.Rfc': companyRfc,
    from_date: fromDate,
    to_date: toDate,
  };

  try {
    const resp = await axios.get(`${BaseURL}/v1/sellsreport/detailed`, {
      headers,
      params,
    });

    if (resp.status !== 200) return null;
    return resp.data.data;
  } catch (err) {
    return null;
  }
};

const getTopByClients = async (params) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `jwt ${localStorage.getItem('token')}`,
  };
  try {
    const resp = await axios.get(`${BaseURL}/v1/sellsreport/top/clients`, {
      headers,
      params,
    });
    if (resp.status !== 200) return null;
    return resp.data.data;
  } catch (err) {
    return null;
  }
};

const getTopByItems = async (params) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `jwt ${localStorage.getItem('token')}`,
  };
  try {
    const resp = await axios.get(`${BaseURL}/v1/sellsreport/top/items`, {
      headers,
      params,
    });
    if (resp.status !== 200) return null;
    return resp.data.data;
  } catch (err) {
    return null;
  }
};

const getTopByService = async (params) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `jwt ${localStorage.getItem('token')}`,
  };
  try {
    const resp = await axios.get(`${BaseURL}/v1/sellsreport/top/service`, {
      headers,
      params,
    });
    if (resp.status !== 200) return null;
    return resp.data.data;
  } catch (err) {
    return null;
  }
};

const SellReportsService = {
  byClients,
  byItems,
  byServices,
  totalSells,
  detailedSells,
  getTopByClients,
  getTopByItems,
  getTopByService,
};

export default SellReportsService;
