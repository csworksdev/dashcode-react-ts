import RbacService from "@/services/RbacService";

export const getRbacRole = () => {
    return RbacService.get('/strict/role');
};

export const getRbacRoleDetail = (name: string, type: string) => {
    return RbacService.get(`/strict/${type}/${name}`);
};


export const createRbacRole = (payload: RbacCreatePayloadType) => {
    return RbacService.post('/strict/role', payload);
};

export const updateRbacRole = (old_name: string, payload: RbacCreatePayloadType) => {
    return RbacService.put(`/strict/role/${old_name}`, payload);
};

export const deleteRbacRole = (name: string) => {
    return RbacService.delete(`/strict/role/${name}`);
};

// RbacAssignAndRevokePayloadType: Global types from types/global.d.ts
export const createRbacRoleAssign = (name: string, payload: RbacAssignAndRevokePayloadType) => {
    const body = payload.assign
    return RbacService.post(`/strict/role/assign/${name}`, {
        childs: body
    });
};

// RbacAssignAndRevokePayloadType: Global types from types/global.d.ts
export const createRbacRoleRevoke = (payload: RbacAssignAndRevokePayloadType) => {
    const body = payload.revoke
    return RbacService.post(`/strict/assignment/revoke/${payload.user_id}.${payload.district_id}`, {
        childs: body
    });
};