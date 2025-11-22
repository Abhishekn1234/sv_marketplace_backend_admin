import { User, IUser } from "../../Models/user.model";
import bcrypt from "bcryptjs";

export const userRepo = {
  // -------------------------
  // Existing Methods
  // -------------------------
  async findById(id: string) {
    return User.findById(id);
  },

  async findUserByEmailOrPhone(email: string, phone: string) {
    return User.findOne({
      $or: [{ email }, { phone }],
    });
  },

  async findUserByEmailExcludingId(email: string, excludeUserId: string) {
    return User.findOne({
      email,
      _id: { $ne: excludeUserId },
    });
  },

  async findUserByPhoneExcludingId(phone: string, excludeUserId: string) {
    return User.findOne({
      phone,
      _id: { $ne: excludeUserId },
    });
  },

  async findUserByEmail(email: string) {
    return User.findOne({ email });
  },

  async findUserByPhone(phone: string) {
    return User.findOne({ phone });
  },

  async findUserById(userId: string) {
    return User.findById(userId);
  },

  async findByIdentifier(identifier: string) {
    return User.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });
  },

  async findBySocialId(socialId: string) {
    return User.findOne({ socialId });
  },

  async checkExistingUser(email: string, phone: string) {
    return User.findOne({
      $or: [{ email }, { phone }],
    });
  },

  async createUser(data: Partial<IUser>) {
    return User.create(data);
  },

  async updateUserById(id: string, update: Partial<IUser>) {
    return User.findByIdAndUpdate(id, update, { new: true });
  },

  updateKYCStatus(userId: string, status: string) {
    return User.findByIdAndUpdate(
      userId,
      { kycStatus: status },
      { new: true }
    );
  },

  findByIdLean(userId: string) {
    return User.findById(userId).lean();
  },

  async changePassword(id: string, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return User.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true }
    );
  },

  // -------------------------
  // ✔ Added CRUD Functionality
  // -------------------------

  // Get all users
  async getAllUsers() {
    return User.find().sort({ createdAt: -1 }); // newest first
  },

  // Get user by ID
  async getUserById(id: string) {
    return User.findById(id);
  },

  // Create user (already exists, but adding alias if needed)
  async createNewUser(data: Partial<IUser>) {
    return User.create(data);
  },

  // Update user by ID
  async updateUser(id: string, data: Partial<IUser>) {
    return User.findByIdAndUpdate(id, data, { new: true });
  },

  // Delete user by ID
  async deleteUser(id: string) {
    return User.findByIdAndDelete(id);
  },
};
