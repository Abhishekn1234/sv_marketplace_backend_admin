import mongoose, { Types } from "mongoose";
import { IUserModules } from "../Types/UserModule";
export declare const UserModules: mongoose.Model<IUserModules, {}, {}, {}, mongoose.Document<unknown, {}, IUserModules, {}, {}> & IUserModules & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>;
//# sourceMappingURL=user_modules.model.d.ts.map