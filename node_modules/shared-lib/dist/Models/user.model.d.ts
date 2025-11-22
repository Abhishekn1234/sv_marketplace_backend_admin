import mongoose, { Document, Types } from "mongoose";
import { KYCSTATUS } from "../Types/Role";
export interface IUser extends Document {
    fullName: string;
    email: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
    password: string;
    bio: string;
    user_role?: Types.ObjectId | null;
    isVerified: boolean;
    kycStatus: KYCSTATUS;
    nationality: string;
    dob: Date;
    profilePictureUrl: string;
    profilePicturePublicId: string;
    address: string;
    social?: {
        provider?: string;
        socialId?: string;
    };
    matchPassword(password: string): Promise<boolean>;
    otp?: string;
    otpExpire?: Date;
    emailVerificationToken?: string;
    __v?: number;
    resetPasswordToken?: string;
    resetPasswordExpire?: Date;
    LogoutTime: string;
    LogoutDate: Date;
    LoginTime: string;
    LoginDate: Date;
    duration: string;
}
export declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: Types.ObjectId;
}>, any>;
//# sourceMappingURL=user.model.d.ts.map