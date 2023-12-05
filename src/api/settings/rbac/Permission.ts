import RbacService from "@/services/RbacService";

export const getRbacPermission = () => {
    return RbacService.get('/strict/permission');
};

export const createRbacPermission = (payload: RbacCreatePayloadType) => {
    return RbacService.post('/strict/permission', payload);
};

export const updateRbacPermission = (old_name: string, payload: RbacCreatePayloadType) => {
    return RbacService.put(`/strict/permission/${old_name}`, payload);
};

export const deleteRbacPermission = (name: string) => {
    return RbacService.delete(`/strict/permission/${name}`);
};