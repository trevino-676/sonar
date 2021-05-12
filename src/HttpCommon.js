import axios from 'axios';

const httpHelper =  axios.create({
    baseUrl: "https://www.sonar32.com.mx",
    headers: {
        "Content-Type": "application/json"
    }
});

export default httpHelper;