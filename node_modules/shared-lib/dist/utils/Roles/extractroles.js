"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PERMISSION_REGEX = exports.RoleNameRegex = exports.extractRoleName = void 0;
// 🟦 Extract Role Name from user.roles
const extractRoleName = (roles) => {
    if (roles && typeof roles === "object" && "name" in roles)
        return null;
    return null; // fallback default
};
exports.extractRoleName = extractRoleName;
exports.RoleNameRegex = /^[A-Za-z ]+$/;
exports.PERMISSION_REGEX = /^[A-Za-z_]+$/;
