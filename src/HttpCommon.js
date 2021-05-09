import axios from 'axios';

export default axios.create({
    baseUrl: "drumbot.robinhood.com",
    headers: {
        "Content-Type": "application/json"
    }
});