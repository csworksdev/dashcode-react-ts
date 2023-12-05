import AuthService from "@/services/AuthService";
import { useQuery } from "@tanstack/react-query";

export const useGetUserWithSameDistrict = ({ queryKey, onError, onSuccess }: any) => {
    return useQuery({
        queryKey: queryKey,
        queryFn: async ({queryKey}) => {
            const userResponse = await AuthService.get("/strict/user-manager", {
                params: {
                    page: queryKey.page,
                    limit: queryKey.limit,
                }
            });
            return userResponse;
        },
        onError,
        onSuccess,
    });
};

export const getUserWithSameDistrict = (params?: UserListEndpointParams) => {
    return AuthService.get('/strict/user-manager', {
        params: params
    });
};

export const creteUserWithSameDistrict = (payload: AuthUserInsertPayloadType) => {
    return AuthService.post('/strict/user-manager', payload);
};

export const getUserDetail = (user_id: number) => {
    return AuthService.get(`/strict/user-manager/${user_id}`);
};