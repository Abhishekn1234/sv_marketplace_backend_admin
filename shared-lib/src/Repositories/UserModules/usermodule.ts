import { UserModules } from "../../Models/user_modules.model";
import { IUserModules } from "../../Types/UserModule";
import { Types } from "mongoose";

export class UserModuleService {
  // ➤ Find all user modules
  static async findAllUserModules(): Promise<IUserModules[]> {
    try {
      return await UserModules.find();
    } catch (err) {
      throw new Error(`Failed to fetch user modules: ${err}`);
    }
  }

  // ➤ Create user module
  static async createUserModule(
    user_group_id: string,
    module_id: string
  ): Promise<IUserModules> {
    try {
      return await UserModules.create({ user_group_id, module_id });
    } catch (err) {
      throw new Error(`Failed to create user module: ${err}`);
    }
  }

  // ➤ Find by ID
  static async findUserModuleById(id: string): Promise<IUserModules | null> {
    if (!Types.ObjectId.isValid(id)) throw new Error("Invalid ID format");
    try {
      return await UserModules.findById(id);
    } catch (err) {
      throw new Error(`Failed to find user module by ID: ${err}`);
    }
  }

  // ➤ Find by role & module
  static async findUserModuleByGroupAndModule(
    user_group_id: string,
    module_id: string
  ): Promise<IUserModules | null> {
    try {
      return await UserModules.findOne({
        user_group_id: new Types.ObjectId(user_group_id),
        module_id: new Types.ObjectId(module_id),
      });
    } catch (err) {
      throw new Error(
        `Failed to find user module by group and module: ${(err as Error).message}`
      );
    }
  }

  // ➤ Update by ID
  static async updateUserModuleById(
    id: string,
    updateData: Partial<IUserModules>
  ): Promise<IUserModules | null> {
    if (!Types.ObjectId.isValid(id)) throw new Error("Invalid ID format");
    try {
      return await UserModules.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
      );
    } catch (err) {
      throw new Error(`Failed to update user module: ${err}`);
    }
  }

  // ➤ Delete by ID
  static async deleteUserModuleById(id: string): Promise<IUserModules | null> {
    if (!Types.ObjectId.isValid(id)) throw new Error("Invalid ID format");
    try {
      return await UserModules.findByIdAndDelete(id);
    } catch (err) {
      throw new Error(`Failed to delete user module: ${err}`);
    }
  }

  // ➤ Get all with populated details
  static async getAllUserModules() {
    try {
      return UserModules.find()
        .populate("user_group_id")
        .populate("module_id");
    } catch (err) {
      throw new Error(`Failed to fetch populated user modules: ${err}`);
    }
  }

  // ➤ Get modules by role
  static async getUserModuleByRoleId(roleId: string) {
    try {
      return UserModules.find({ user_group_id: roleId })
        .populate("user_group_id")
        .populate("module_id");
    } catch (err) {
      throw new Error(`Failed to fetch modules for role: ${err}`);
    }
  }

  // ➤ Update modules for a role
  static async updateUserModule(roleId: string, module_ids: string[]) {
    try {
      return UserModules.updateMany(
        { user_group_id: roleId },
        { module_id: { $in: module_ids } }
      );
    } catch (err) {
      throw new Error(`Failed to update user modules: ${err}`);
    }
  }

  // ➤ Delete modules for role
  static async deleteUserModule(roleId: string) {
    try {
      return UserModules.deleteMany({ user_group_id: roleId });
    } catch (err) {
      throw new Error(`Failed to delete user modules: ${err}`);
    }
  }
}
