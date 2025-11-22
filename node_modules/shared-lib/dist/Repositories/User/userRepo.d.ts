import { IUser } from "../../Models/user.model";
export declare const userRepo: {
    findById(id: string): Promise<(import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    findUserByEmailOrPhone(email: string, phone: string): Promise<(import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    findUserByEmailExcludingId(email: string, excludeUserId: string): Promise<(import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    findUserByPhoneExcludingId(phone: string, excludeUserId: string): Promise<(import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    findUserByEmail(email: string): Promise<(import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    findUserByPhone(phone: string): Promise<(import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    findUserById(userId: string): Promise<(import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    findByIdentifier(identifier: string): Promise<(import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    findBySocialId(socialId: string): Promise<(import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    checkExistingUser(email: string, phone: string): Promise<(import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    createUser(data: Partial<IUser>): Promise<import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateUserById(id: string, update: Partial<IUser>): Promise<(import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    updateKYCStatus(userId: string, status: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null, import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, {}, IUser, "findOneAndUpdate", {}>;
    findByIdLean(userId: string): import("mongoose").Query<(import("mongoose").FlattenMaps<IUser> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null, import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, {}, IUser, "findOne", {}>;
    changePassword(id: string, newPassword: string): Promise<(import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    getAllUsers(): Promise<(import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    getUserById(id: string): Promise<(import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    createNewUser(data: Partial<IUser>): Promise<import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateUser(id: string, data: Partial<IUser>): Promise<(import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    deleteUser(id: string): Promise<(import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
};
//# sourceMappingURL=userRepo.d.ts.map