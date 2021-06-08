import axios from "axios";

const baseUrl = "https://www.sonar32.com.mx"

const upload = async (user, pass) => {
  const resp = ""; 
  
  axios({
    method:"POST", 
    url: baseUrl+"/v1/login", 
    data : {
      user : user, 
      pass : pass 
    }
  }).then( function(res) {resp = res;}); 

  return res;
};
 

const SendService = {
  upload
};

export default SendService;
