"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEmailVerificationToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// export const generateTokens = (id: string, roleName: string) => {
//   const accessToken = jwt.sign({ id, role: roleName }, process.env.JWT_ACCESS_SECRET!, {
//     expiresIn: "4h",
//   });
//   const refreshToken = jwt.sign({ id }, process.env.JWT_REFRESH_SECRET!, {
//     expiresIn: "7d",
//   });
//   return { accessToken, refreshToken };
// };
const generateAccessToken = (id) => jsonwebtoken_1.default.sign({ id }, process.env.JWT_ACCESS_SECRET, { expiresIn: "4h" });
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (id) => jsonwebtoken_1.default.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
exports.generateRefreshToken = generateRefreshToken;
const generateEmailVerificationToken = (id) => jsonwebtoken_1.default.sign({ id }, process.env.JWT_ACCESS_SECRET, { expiresIn: "30d" });
exports.generateEmailVerificationToken = generateEmailVerificationToken;
