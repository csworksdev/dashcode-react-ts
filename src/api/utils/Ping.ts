import axios from "axios";

export const getPingService = (base_url: string) => {
    return axios.get(base_url);
};