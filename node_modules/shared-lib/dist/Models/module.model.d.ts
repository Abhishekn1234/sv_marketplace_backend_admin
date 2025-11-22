import mongoose, { Types } from "mongoose";
import { IModule } from "../Types/Module";
export declare const Module: mongoose.Model<IModule, {}, {}, {}, mongoose.Document<unknown, {}, IModule, {}, {}> & IModule & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=module.model.d.ts.map