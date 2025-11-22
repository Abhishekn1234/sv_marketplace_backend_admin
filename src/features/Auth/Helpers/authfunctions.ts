import { Role } from "shared-lib";
import { User,IUser } from "shared-lib";

export class AdminAuth {
   static async findRoleById(id: string) {
   return Role.findById(id);
  }
  static async findAdminByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }
  static async findAdminByPhone(phone: string): Promise<IUser | null> {
    return await User.findOne({ phone });
  }
  

  static async checkExistingAdmin(
    email: string,
    phone: string
  ): Promise<IUser | null> {
    return await User.findOne({
      $or: [{ email }, { phone }],
    });
  }

  static async loginAdmin(email: string, password: string): Promise<IUser | null> {
    return await User.findOne({
      $or: [{ email }, {  }],
    });
  }
}
