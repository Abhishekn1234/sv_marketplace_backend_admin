"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rolefunctions = void 0;
const user_role_model_1 = require("../../Models/user.role.model");
class Rolefunctions {
    static async updateRole(id, data) {
        return await user_role_model_1.Role.findByIdAndUpdate(id, data, { new: true });
    }
    static async deleteRole(id) {
        return await user_role_model_1.Role.findByIdAndDelete(id);
    }
    static async fetchRoleById(id) {
        return await user_role_model_1.Role.findById(id);
    }
    static async fetchByNames(name) {
        return await user_role_model_1.Role.findOne({ name });
    }
    static async fetchRoles() {
        return await user_role_model_1.Role.find();
    }
    static async addRoles(name) {
        return await user_role_model_1.Role.create({ name });
    }
}
exports.Rolefunctions = Rolefunctions;
