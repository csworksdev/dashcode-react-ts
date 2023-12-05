import { DETECT_USER_IP_URL } from "@/constant/data";
import axios from "axios";

export const getUserIp = () => {
    return axios.get(DETECT_USER_IP_URL);
};