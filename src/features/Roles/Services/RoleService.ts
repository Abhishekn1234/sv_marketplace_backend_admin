import { Rolefunctions } from "shared-lib";

import { UserRole as Roles } from "shared-lib/dist/Types/Role";


export const RoleAddServices = async (name: string) => {
    const existing = await Rolefunctions.fetchByNames(name);
    if (existing) throw new Error("Role name is already in use");

    return await Rolefunctions.addRoles(name);
    
};

export const RoleUpdateServices = async (id: string, data: Partial<Roles>) => {
    const role = await Rolefunctions.fetchRoleById(id);
    if (!role) throw new Error("Role not found");

    return await Rolefunctions.updateRole(id, data);
};


export const RoleDeleteServices = async (id: string) => {
    const role = await Rolefunctions.fetchRoleById(id);
    if (!role) throw new Error("Role not found");

    const deleted = await Rolefunctions.deleteRole(id);
    return deleted ? true : false;
};

export const RoleAll = async () => {
    const roles = await Rolefunctions.fetchRoles();
    return roles;
};

export const RoleById = async (id: string) => {
    const role = await Rolefunctions.fetchRoleById(id);
    if (!role) throw new Error("Role not found");
    return role;
};

