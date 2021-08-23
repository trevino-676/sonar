import axios from 'axios';

const BaseURL = 'https://www.sonar32.com/v1/config';

const headers = {
  'Content-Type': 'application/json',
  Authorization: `jwt ${localStorage.getItem('token')}`,
};

const getUserConfig = async () => {
  const url = `${BaseURL}/`;
  try {
    const resp = await axios.get(url, { headers });

    if (resp.status !== 200) {
      return null;
    }
    return resp.data.data;
  } catch (err) {
    if (err.message.indexOf('401') > 0) {
      return 401;
    }
    return null;
  }
};

const saveUserConfig = async (config) => {
  const url = `${BaseURL}/`;
  try {
    const resp = await axios.post(url, config, { headers });

    if (resp.status !== 200) {
      return null;
    }
    return resp.data.status;
  } catch (err) {
    if (err.message.indexOf('401') > 0) {
      return 401;
    }
    return null;
  }
};

const updateUserConfig = async (config) => {
  const url = `${BaseURL}/`;
  try {
    const resp = await axios.put(url, config, { headers });

    if (resp.status !== 200) return null;
    return resp.data.status;
  } catch (err) {
    if (err.message.indexOf('401') > 0) {
      return 401;
    }
    return null;
  }
};

const ConfigService = {
  getUserConfig,
  saveUserConfig,
  updateUserConfig,
};

export default ConfigService;
