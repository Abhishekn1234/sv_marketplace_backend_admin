import { Types } from "mongoose";
export interface IModule extends Document {
    _id: Types.ObjectId;
    module: string;
    modulelanguagekey: string;
    sort: number;
    parent: string;
}
//# sourceMappingURL=Module.d.ts.map