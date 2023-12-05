import RbacService from "@/services/RbacService";

// RbacAssignAndRevokePayloadType: Global types from types/global.d.ts
export const createRbacAssign = (payload: RbacAssignAndRevokePayloadType) => {
    const body = payload.assign
    return RbacService.post(`/strict/assignment/assign/${payload.user_id}.${payload.district_id}`, {
        childs: body
    });
};

// RbacAssignAndRevokePayloadType: Global types from types/global.d.ts
export const createRbacRevoke = (payload: RbacAssignAndRevokePayloadType) => {
    const body = payload.revoke
    return RbacService.post(`/strict/assignment/revoke/${payload.user_id}.${payload.district_id}`, {
        childs: body
    });
};

// RbacByUserPayloadType: Global types from types/global.d.ts
export const getRbacByUser = (payload: RbacByUserPayloadType) => {
    return RbacService.get(`/strict/assignment/${payload.user_id}.${payload.district_id}`);
};