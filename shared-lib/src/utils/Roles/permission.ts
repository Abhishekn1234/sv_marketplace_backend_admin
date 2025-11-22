import { User } from "../../Models/user.model";
import { UserModules } from "../../Models/user_modules.model";
import { Module } from "../../Models/module.model";

export async function checkModuleAccess(userId: string, moduleKey: string) {
  // 1. Load user with role
  const user = await User.findById(userId).populate("user_role");

  if (!user) {
    throw new Error("Invalid user");
  }

  const roleId = user.user_role;

  if (!roleId) {
    throw new Error("User has no role assigned");
  }

  // 2. Find module by modulelanguagekey (or module name)
  const moduleData = await Module.findOne({ modulelanguagekey: moduleKey });

  if (!moduleData) {
    throw new Error(`Module '${moduleKey}' not found`);
  }

  // 3. Check mapping in UserModules
  const userModule = await UserModules.findOne({
    user_group_id: roleId,
    module_id: moduleData._id,
  });

  if (!userModule) {
    throw new Error("Access Denied: You do not have permission for this module");
  }

  return true;
}
