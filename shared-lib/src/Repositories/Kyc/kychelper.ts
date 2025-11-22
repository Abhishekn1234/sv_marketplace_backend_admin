import { KYC } from "../../Models/kyc.model";
import { generateAccessToken, generateRefreshToken } from "../../utils/Auth/token";
import { emailRegex,phoneRegex,passwordRegex } from "../../utils/Auth/regexvalidation";

export const validateIdentifier = (identifier: string) => {
  if (!emailRegex.test(identifier) && !phoneRegex.test(identifier))
    throw new Error("Invalid email or phone format");
};

export const generateTokens = (id: string) => {
  return {
    accessToken: generateAccessToken(id),
    refreshToken: generateRefreshToken(id),
  };
};

export const sanitizeUser = (userObj: any) => {
  const removeFields = [
    "password", "otp", "otpExpire", "resetPasswordToken", "resetPasswordExpire",
    "emailVerificationToken", "LoginDate", "LoginTime", "LogoutDate", "LogoutTime",
    "duration", "__v", "createdAt", "updatedAt", "accessToken", "refreshToken"
  ];

  removeFields.forEach(key => delete userObj[key]);
  return userObj;
};

export const getLatestKyc = async (userId: string) => {
  return await KYC.findOne({ userId })
    .sort({ createdAt: -1 })
    .select("-__v -createdAt -updatedAt -overallStatus -userId")
    .lean();
};


export const filterAllowedUpdates = (data: any, allowed: string[]) => {
  const updates: any = {};
  allowed.forEach(key => {
    if (data[key] !== undefined) {
      updates[key] = key === "dob" ? new Date(data[key]) : data[key];
    }
  });
  return updates;
};