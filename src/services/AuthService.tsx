import ForbiddenNotify from '@/components/ForbiddenNotify';
import { CONST_SERVICE_AUTH_URL } from '@/constant/environment';
import { getCookie } from '@/utils/cookie';
import { catchDefaultError } from '@/utils/validation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AuthService = axios.create({
    baseURL: CONST_SERVICE_AUTH_URL, // http://192.168.128.101:31817
});

AuthService.interceptors.request.use(function (config) {
    config.headers.Accept = `application/json`;
    config.headers['Content-Type'] = `application/json`;
    const token = getCookie('X-SIPD-PU-TK');
    if (token) {
        config.headers.authorization = `Bearer ${token}`;
    }
    return config;
});

AuthService.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response.data.message === 'Forbidden - Anda tidak diizinkan mengakses fungsi ini') {
            toast(() => (<ForbiddenNotify error={error}/>));
            return
        }
        catchDefaultError(error)
        return Promise.reject(error);
    }
);

export default AuthService;