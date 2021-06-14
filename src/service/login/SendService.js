import axios from "axios";

//const baseUrl = "https://www.sonar32.com.mx"
const baseUrl = "http://localhost:5000/unprotected"; 

const headers = {
  'Content-Type': 'application/json',
};

const login = async (user, pass) => {
  const formData = new FormData();
  formData.append('user', user);
  formData.append('pass', pass);
  const resp = await axios.post(baseUrl, formData, {
    headers: { 
      'Content-Type': 'multipart/form-data',
    },
  });
   
  if( resp.data.data == 1 ) {
    alert("Bienvenido"); 
    window.location = "settings"; 
  } else {
    alert("Error en usuario y/o contraseña"); 
  }
};
 

const SendService = {
  login 
};

export default SendService;
