import AuthService from "@/services/AuthService";

export const getProfile = () => {
    return AuthService.get('/strict/user/profile');
};