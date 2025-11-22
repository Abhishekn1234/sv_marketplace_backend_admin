"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkModuleAccess = checkModuleAccess;
const user_model_1 = require("../../Models/user.model");
const user_modules_model_1 = require("../../Models/user_modules.model");
const module_model_1 = require("../../Models/module.model");
async function checkModuleAccess(userId, moduleKey) {
    // 1. Load user with role
    const user = await user_model_1.User.findById(userId).populate("user_role");
    if (!user) {
        throw new Error("Invalid user");
    }
    const roleId = user.user_role;
    if (!roleId) {
        throw new Error("User has no role assigned");
    }
    // 2. Find module by modulelanguagekey (or module name)
    const moduleData = await module_model_1.Module.findOne({ modulelanguagekey: moduleKey });
    if (!moduleData) {
        throw new Error(`Module '${moduleKey}' not found`);
    }
    // 3. Check mapping in UserModules
    const userModule = await user_modules_model_1.UserModules.findOne({
        user_group_id: roleId,
        module_id: moduleData._id,
    });
    if (!userModule) {
        throw new Error("Access Denied: You do not have permission for this module");
    }
    return true;
}
