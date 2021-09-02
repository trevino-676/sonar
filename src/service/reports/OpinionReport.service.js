import axios from 'axios';

const BaseURL = 'https://www.sonar32.com.mx';

const opinionReport = async (filters) => {
  const headers = {'Content-Type': 'application/json',
    Authorization: `jwt ${localStorage.getItem('token')}`,
  };

  try {
    const resp = await axios.get(`${BaseURL}/v1/opinion/reports/`, {
      headers,
      params: filters,
    });
    if (resp.status !== 200) return null;
    return resp.data.data;
  } catch (err) {
    return null;
  }
};

const OpinionService = {
  opinionReport,
};

export default OpinionService;
