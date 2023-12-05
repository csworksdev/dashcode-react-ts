import AuthService from "@/services/AuthService";

export const authPreLogin = (body: any) => {
    return AuthService.post('/auth/pre-login', body);
};

export const authLogin = (body: any) => {
    return AuthService.post('/auth/login', body);
};