import RbacService from "@/services/RbacService";

export const getRbacRute = () => {
    return RbacService.get('/strict/route');
};

export const createRbacRute = (payload: RbacCreatePayloadType) => {
    return RbacService.post('/strict/route', payload);
};

export const deleteRbacRute = (name: string) => {
    return RbacService.delete(`/strict/route/${name}`);
};