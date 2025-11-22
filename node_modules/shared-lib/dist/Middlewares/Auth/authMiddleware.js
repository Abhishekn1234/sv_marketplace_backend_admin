"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCustomer = exports.isCoordinator = exports.isEmployee = exports.isAdmin = exports.authorizeRoles = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../../Models/user.model");
const mongoose_1 = __importDefault(require("mongoose"));
const protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization?.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token)
            return res.status(401).json({ message: "No token provided" });
        if (!process.env.JWT_ACCESS_SECRET)
            throw new Error("JWT secret not defined");
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_SECRET);
        // 👇 Correct populate path "roles"
        const user = await user_model_1.User.findById(decoded.id)
            .select("-password")
            .populate("roles");
        if (!user)
            return res.status(401).json({ message: "User not found" });
        const roleName = user.roles?.name; // 👈 Correct extraction
        req.user = {
            ...user.toObject(),
            _id: new mongoose_1.default.Types.ObjectId(user._id),
            roleName: user.roles?.name,
        };
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
exports.protect = protect;
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user)
            return res.status(401).json({ message: "Not authenticated" });
        const roleName = req.user.roleName;
        if (!roles.includes(roleName)) {
            return res.status(403).json({ message: `Access denied for role: ${roleName}` });
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
exports.isAdmin = (0, exports.authorizeRoles)("admin");
exports.isEmployee = (0, exports.authorizeRoles)("employee", "admin");
exports.isCoordinator = (0, exports.authorizeRoles)("coordinator", "admin");
exports.isCustomer = (0, exports.authorizeRoles)("customer", "admin", "employee");
