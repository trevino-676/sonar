import axios from "axios";

const baseUrl = "https://www.sonar32.com.mx"

const headers = {
    'Content-Type': 'application/json'
}

const createCompany = async (company) => {
    const data = {
        "company": company
    };

    const resp = await axios.post(`${baseUrl}/v1/company/`, data, {headers});
    return resp;
};

const findCompanies = async (type, filters) => {
    const data = {
        type,
        filters
    }
    const resp = await axios.get(`${baseUrl}/v1/company/all`, data, {headers});
    return resp;
}

const updateCompany = async (company) => {
    const data = {
        company
    }
    const resp = await axios.put(`${baseUrl}/v1/compamy/`, data, {headers});
    return resp;
}

const deleteCompany = async (id) => {
    const resp = await axios.delete(`${baseUrl}/v1/company/${id}`, {headers});
    return resp;
}

const CompanyService = {
    createCompany,
    findCompanies,
    updateCompany,
    deleteCompany
}

export default CompanyService;