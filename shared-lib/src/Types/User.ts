import { IUser, User } from "../Models/user.model";
import { IKYCDocument, IKYC } from "../Models/kyc.model";
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


// export type UserRole="customer"|"employee"|"admin"|"coordinator";

// export type KYCSTATUS="pending"|"verified"|"rejected"|"not_submitted"|"submitted";



