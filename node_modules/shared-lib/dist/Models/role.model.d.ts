import mongoose, { Schema } from "mongoose";
import { Roles } from "../Types/Role";
export declare const Role: mongoose.Model<Roles, {}, {}, {}, mongoose.Document<unknown, {}, Roles, {}, {}> & Roles & Required<{
    _id: Schema.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=role.model.d.ts.map