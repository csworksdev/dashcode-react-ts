import RbacService from "@/services/RbacService";

export const getRbacMenu = () => {
    return RbacService.get('/strict/menu/index');
};

export const checkRbacMenu = (user_id: string, menu: string) => {
    return RbacService.get(`/rbac/validate-menu/${user_id}/${menu}`);
};