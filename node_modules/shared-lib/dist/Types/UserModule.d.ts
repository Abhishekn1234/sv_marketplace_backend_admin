import { Types } from "mongoose";
import { UserRole } from "./Role";
import { IModule } from "./Module";
export interface IUserModules extends Document {
    user_group_id: Types.ObjectId | UserRole;
    module_id: Types.ObjectId[] | IModule[];
}
//# sourceMappingURL=UserModule.d.ts.map