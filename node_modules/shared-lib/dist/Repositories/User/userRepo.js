"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepo = void 0;
const user_model_1 = require("../../Models/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.userRepo = {
    // -------------------------
    // Existing Methods
    // -------------------------
    async findById(id) {
        return user_model_1.User.findById(id);
    },
    async findUserByEmailOrPhone(email, phone) {
        return user_model_1.User.findOne({
            $or: [{ email }, { phone }],
        });
    },
    async findUserByEmailExcludingId(email, excludeUserId) {
        return user_model_1.User.findOne({
            email,
            _id: { $ne: excludeUserId },
        });
    },
    async findUserByPhoneExcludingId(phone, excludeUserId) {
        return user_model_1.User.findOne({
            phone,
            _id: { $ne: excludeUserId },
        });
    },
    async findUserByEmail(email) {
        return user_model_1.User.findOne({ email });
    },
    async findUserByPhone(phone) {
        return user_model_1.User.findOne({ phone });
    },
    async findUserById(userId) {
        return user_model_1.User.findById(userId);
    },
    async findByIdentifier(identifier) {
        return user_model_1.User.findOne({
            $or: [{ email: identifier }, { phone: identifier }],
        });
    },
    async findBySocialId(socialId) {
        return user_model_1.User.findOne({ socialId });
    },
    async checkExistingUser(email, phone) {
        return user_model_1.User.findOne({
            $or: [{ email }, { phone }],
        });
    },
    async createUser(data) {
        return user_model_1.User.create(data);
    },
    async updateUserById(id, update) {
        return user_model_1.User.findByIdAndUpdate(id, update, { new: true });
    },
    updateKYCStatus(userId, status) {
        return user_model_1.User.findByIdAndUpdate(userId, { kycStatus: status }, { new: true });
    },
    findByIdLean(userId) {
        return user_model_1.User.findById(userId).lean();
    },
    async changePassword(id, newPassword) {
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
        return user_model_1.User.findByIdAndUpdate(id, { password: hashedPassword }, { new: true });
    },
    // -------------------------
    // ✔ Added CRUD Functionality
    // -------------------------
    // Get all users
    async getAllUsers() {
        return user_model_1.User.find().sort({ createdAt: -1 }); // newest first
    },
    // Get user by ID
    async getUserById(id) {
        return user_model_1.User.findById(id);
    },
    // Create user (already exists, but adding alias if needed)
    async createNewUser(data) {
        return user_model_1.User.create(data);
    },
    // Update user by ID
    async updateUser(id, data) {
        return user_model_1.User.findByIdAndUpdate(id, data, { new: true });
    },
    // Delete user by ID
    async deleteUser(id) {
        return user_model_1.User.findByIdAndDelete(id);
    },
};
