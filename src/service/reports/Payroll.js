import axios from 'axios';

const BaseURL = 'https://www.sonar32.com.mx';

const taxablePerceptions = async (filters) => {
  const headers = { 'Content-Type': 'application/json' };
  try {
    const resp = await axios.get(
      `${BaseURL}/v1/payroll/reports/taxables_perceptions`,
      {
        headers,
        params: filters,
      }
    );
    if (resp.status !== 200) {
      return null;
    }
    return resp.data.data;
  } catch (err) {
    return null;
  }
};

const PayrollReportService = {
  taxablePerceptions,
};

export default PayrollReportService;
