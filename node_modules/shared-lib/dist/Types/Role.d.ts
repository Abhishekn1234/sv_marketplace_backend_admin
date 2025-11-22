import { ObjectId } from "mongoose";
export type RoleType = "user" | "admin" | "superadmin" | "employee" | "coordinator";
export type KYCSTATUS = "pending" | "verified" | "rejected" | "not_submitted" | "submitted";
export interface UserRole extends Document {
    _id: ObjectId;
    name: string;
}
//# sourceMappingURL=Role.d.ts.map