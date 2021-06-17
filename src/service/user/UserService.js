import axios from 'axios';

const baseURL = 'https://www.sonar32.com.mx';

const getHeaders = (token) => ({
  'Content-Type': 'application/json',
  Authorization: `jwt ${token}`,
});

const GetUsers = async (type, filters) => {
  let data = {};
  if (type && filters) {
    data = { type, filters };
  }

  const url = `${baseURL}/v1/user/all`;
  const token = localStorage.getItem('token');

  if (!token) {
    return 401;
  }

  const headers = getHeaders(token);
  const params = data;
  const resp = await axios.get(url, { headers, params });
  return resp;
};

const UpdateUser = async (oldUser) => {
  const url = `${baseURL}/v1/user/`;
  const token = localStorage.getItem('token');

  if (!token) {
    return 401;
  }

  const headers = getHeaders(token);
  try {
    const resp = await axios.put(url, oldUser, { headers });
    if (resp.status === 200) {
      return resp.data.status;
    }
    return null;
  } catch (e) {
    if (e.message.indexOf('401') > 0) {
      return 401;
    }
    return null;
  }
};

const DeleteUser = async (id) => {
  const url = `${baseURL}/v1/user/`;
  const token = localStorage.getItem('token');

  if (!token) {
    return 401;
  }
  const headers = getHeaders(token);
  try {
    const resp = await axios.delete(url, { headers, params: { id } });
    if (resp.status === 200) {
      return resp.data.status;
    }
    return null;
  } catch (e) {
    if (e.message.indexOf('401') > 0) {
      return 401;
    }
    return null;
  }
};

const UserService = {
  GetUsers,
  UpdateUser,
  DeleteUser,
};

export default UserService;
