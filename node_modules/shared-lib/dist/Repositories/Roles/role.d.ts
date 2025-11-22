import { UserRole } from "../../Types/Role";
export declare class Rolefunctions {
    static updateRole(id: string, data: Partial<UserRole>): Promise<(import("mongoose").Document<unknown, {}, UserRole, {}, {}> & UserRole & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    static deleteRole(id: string): Promise<(import("mongoose").Document<unknown, {}, UserRole, {}, {}> & UserRole & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    static fetchRoleById(id: string): Promise<(import("mongoose").Document<unknown, {}, UserRole, {}, {}> & UserRole & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    static fetchByNames(name: string): Promise<(import("mongoose").Document<unknown, {}, UserRole, {}, {}> & UserRole & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    static fetchRoles(): Promise<(import("mongoose").Document<unknown, {}, UserRole, {}, {}> & UserRole & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    static addRoles(name: string): Promise<UserRole>;
}
//# sourceMappingURL=role.d.ts.map