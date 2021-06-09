import axios from 'axios';

const BASEURL = 'https://www.sonar32.com.mx';

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
