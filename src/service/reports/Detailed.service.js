import axios from 'axios';

const BaseURL = 'https://www.sonar32.com.mx';

const getProviderDetailed = async (companyRfc) => {
  // const date = new Date();
  const fromDate = '2021-05-01T00:00:00';
  // const fromDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const toDate = '2021-05-31T23:59:59';
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `jwt ${localStorage.getItem('token')}`,
  };
  const params = {
    rfc: companyRfc,
    from_date: fromDate,
    to_date: toDate,
  };
  try {
    const resp = await axios.get(`${BaseURL}/v1/report/detialed/provider`, {
      headers,
      params,
    });
    if (resp.status !== 200) return null;
    return resp.data.data;
  } catch (err) {
    return null;
  }
};

const DetailedReportService = {
  getProviderDetailed,
};

export default DetailedReportService;
