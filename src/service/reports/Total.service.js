import axios from 'axios';

const BaseURL = 'https://www.sonar32.com.mx';

const getTotalData = async ({ fromDate, toDate, field, rfc }) => {
  const data = new FormData();
  data.append('user', rfc);
  data.append('dateBegin', fromDate);
  data.append('dateEnd', toDate);
  data.append('fieldMatch', field);
  const headers = {
    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
  };
  try {
    const resp = await axios.post(`${BaseURL}/v1/principal/get-count`, data, {
      headers,
    });
    if (resp.status !== 200) return null;
    return resp.data.data[0];
  } catch (err) {
    return null;
  }
};

const TotalServirce = {
  getTotalData,
};

export default TotalServirce;
