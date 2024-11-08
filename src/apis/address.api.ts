import axios from "axios";

const addressHost = 'https://provinces.open-api.vn/api?depth=3'

const getProvince = () => {
    return axios.get(addressHost);
}

export const addressAPIs = { getProvince };