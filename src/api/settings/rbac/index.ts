import RbacService from "@/services/RbacService";

// RbacAssignAndRevokePayloadType: Global types from types/global.d.ts
export const createRbacAssign = (type: string, payload: RbacAssignAndRevokePayloadType) => {
    const body = payload.assign
    if (type !== 'menu') {
        return RbacService.post(`/strict/${type}/assign/${payload.name}`, {
            childs: body
        });
    } else {
        return RbacService.post(`/strict/${type}/assign`, {
            name: payload.name,
            roles: body
        });
    }
};

// RbacAssignAndRevokePayloadType: Global types from types/global.d.ts
export const createRbacRevoke = (id: any, type: string, payload: string[]) => {
    if (type !== 'menu') {
        return RbacService.post(`/strict/${type}/revoke/${id}`, {
            childs: payload
        });
    } else {
        return RbacService.post(`/strict/${type}/revoke`, {
            name: id,
            roles: payload
        });
    }
};