import { Role } from "../../Models/user.role.model";
import { UserRole } from "../../Types/Role";

export class Rolefunctions {
    
    static async updateRole(id: string, data: Partial<UserRole>) {
        return await Role.findByIdAndUpdate(id, data, { new: true });
    }

    static async deleteRole(id: string) {
        return await Role.findByIdAndDelete(id);
    }

    static async fetchRoleById(id: string) {
        return await Role.findById(id);
    }

    static async fetchByNames(name: string) {
        return await Role.findOne({ name });
    }

    static async fetchRoles() {
        return await Role.find();
    }

    static async addRoles(name: string): Promise<UserRole> {
        return await Role.create({ name });
    }
}


