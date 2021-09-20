import axios from 'axios';

const BaseURL = 'https://www.sonar32.com.mx';
//const BaseURL = 'http://127.0.0.1:5000';
  
const groupRequest = async (apiCol, company, fieldMatch = '', fieldGroup = '') => {
  // const date = new Date();
  // const fromDate = new Date(date.getFullYear(), date.getMonth(), 1);

  const data = new FormData();
  data.append('user', company.Rfc);
  data.append('dateBegin', company.fromDate);
  data.append('dateEnd', company.toDate);
  data.append('fieldMatch', fieldMatch);
  data.append('fieldGroup', fieldGroup);

  const headers = {
    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
  };

  try {
    const resp = await axios.post(`${BaseURL}/v1/${apiCol}/get-group`, data, {
      headers,
    });
    if (resp.status !== 200) return null;
    return resp.data.data;
  } catch (err) {
    return null;
  }
};

const countRequest = async (apiCol, company, fieldMatch = '', total, subTotal) => {
    const data = new FormData();
    data.append('user', company.Rfc);
    data.append('dateBegin', company.fromDate);
    data.append('dateEnd', company.toDate);
    data.append('fieldMatch', fieldMatch);
    data.append('totalCol', total);
    data.append('subTotalCol', subTotal);
  
    const headers = {
      'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
    };
  
    try {
      const resp = await axios.post(`${BaseURL}/v1/${apiCol}/get-count`, data, {
        headers,
      });
      if (resp.status !== 200) return null;
      return resp.data.data;
    } catch (err) {
      return null;
    }
};
 
const getEfos = async () => {
    return "1100"; 
    try {  
      const resp = await axios.get("http://127.0.0.1:5000/v1/retentions/reports/nominas?empresa=GPR070228780");
        if (resp.status !== 200) return "ERROR PET";
          return ".....";    
    } catch (err) { 
      return  "-error-"; 
    }
};

const CFDIReports = {
    groupRequest,
    countRequest, 
    getEfos 
};
 
export default CFDIReports;
