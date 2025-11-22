import { IUser } from "../Models/user.model";
import { IKYCDocument } from "../Models/kyc.model";
export interface RegisterUserResponse {
    user: IUser & {
        documents: IKYCDocument[];
        kycStatus: string;
        roleName: string;
    };
    accessToken: string;
    refreshToken: string;
}
export interface ChangePasswordResponse {
    success: boolean;
    message: string;
}
export interface LoginUserResponse {
    user: IUser & {
        documents: IKYCDocument[];
        kycStatus: string;
        roleName: string;
    };
    accessToken: string;
    refreshToken: string;
}
export interface UpdateBioData {
    fullName?: string;
    phone?: string;
    email?: string;
    dob?: Date | string;
    bio?: string;
    address?: string;
    profilePictureUrl?: string;
    nationality?: string;
}
//# sourceMappingURL=User.d.ts.map