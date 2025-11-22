"use strict";
// export const sanitizeUser = (user: any) => {
//   const { 
//     password, 
//     otp, 
//     otpExpire,
//     __v, 
//     refreshToken, 
//     accessToken, 
//     resetPasswordToken,
//     resetPasswordExpires,
//     resetPasswordExpire,
//     emailVerificationToken,
//     LoginDate,
//     LoginTime,
//     lastLoginDate,
//     lastLoginTime,
//     LogoutDate,
//     LogoutTime,
//     logoutDate,
//     logoutTime,
//     duration,
//     createdAt,
//     updatedAt,
//     ...rest 
//   } = user;
Object.defineProperty(exports, "__esModule", { value: true });
exports.strongPasswordRegex = exports.passwordRegex = exports.phoneRegex = exports.emailRegex = exports.validateRegistrationInputs = void 0;
//   return rest;
// };
const validateRegistrationInputs = (email, phone, password) => {
    if (!exports.emailRegex.test(email))
        throw new Error("Invalid email format");
    if (!exports.phoneRegex.test(phone))
        throw new Error("Invalid phone number. Must include country code + 10 digits");
    if (!exports.passwordRegex.test(password))
        throw new Error("Password must be 8–12 characters long and contain letters & numbers");
};
exports.validateRegistrationInputs = validateRegistrationInputs;
exports.emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
exports.phoneRegex = /^\+\d{1,3}\s?\d{10}$/;
exports.passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,12}$/;
exports.strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
