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

const totalSells = async (companyRfc) => {
  // const date = new Date();
  // const fromDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const fromDate = '2021-05-01T00:00:00';
  const toDate = '2021-05-31T23:59:59';
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

const detailedSells = async (companyRfc) => {
  // const date = new Date();
  const fromDate = '2021-05-01T00:00:00';
  // const fromDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const toDate = '2021-05-31T23:59:59';
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

const SellReportsService = {
  byClients,
  byItems,
  byServices,
  totalSells,
  detailedSells,
};

export default SellReportsService;
