import axios from 'axios';

const BASEURL = 'http://10.200.10.50:5000';

const headers = {
  'Content-Type': 'application/json',
};

const useLogin = (data) => {
  const login = async () => {
    const resp = await axios.post(`${BASEURL}/auth`, data, { headers });
    return resp;
  };

  const logout = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return true;
    }
    localStorage.removeItem('token');
    return true;
  };

  return [login, logout];
};

export default useLogin;
