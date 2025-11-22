"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterAllowedUpdates = exports.getLatestKyc = exports.sanitizeUser = exports.generateTokens = exports.validateIdentifier = void 0;
const kyc_model_1 = require("../../Models/kyc.model");
const token_1 = require("../../utils/Auth/token");
const regexvalidation_1 = require("../../utils/Auth/regexvalidation");
const validateIdentifier = (identifier) => {
    if (!regexvalidation_1.emailRegex.test(identifier) && !regexvalidation_1.phoneRegex.test(identifier))
        throw new Error("Invalid email or phone format");
};
exports.validateIdentifier = validateIdentifier;
const generateTokens = (id) => {
    return {
        accessToken: (0, token_1.generateAccessToken)(id),
        refreshToken: (0, token_1.generateRefreshToken)(id),
    };
};
exports.generateTokens = generateTokens;
const sanitizeUser = (userObj) => {
    const removeFields = [
        "password", "otp", "otpExpire", "resetPasswordToken", "resetPasswordExpire",
        "emailVerificationToken", "LoginDate", "LoginTime", "LogoutDate", "LogoutTime",
        "duration", "__v", "createdAt", "updatedAt", "accessToken", "refreshToken"
    ];
    removeFields.forEach(key => delete userObj[key]);
    return userObj;
};
exports.sanitizeUser = sanitizeUser;
const getLatestKyc = async (userId) => {
    return await kyc_model_1.KYC.findOne({ userId })
        .sort({ createdAt: -1 })
        .select("-__v -createdAt -updatedAt -overallStatus -userId")
        .lean();
};
exports.getLatestKyc = getLatestKyc;
const filterAllowedUpdates = (data, allowed) => {
    const updates = {};
    allowed.forEach(key => {
        if (data[key] !== undefined) {
            updates[key] = key === "dob" ? new Date(data[key]) : data[key];
        }
    });
    return updates;
};
exports.filterAllowedUpdates = filterAllowedUpdates;
