import mongoose, { Schema, Document } from "mongoose";

import { UserRole } from "../Types/Role";

const roleSchema = new Schema<UserRole>({
  name: {
    type: String,
    required: true
  }
});

export const Role = mongoose.model<UserRole>("UserRole", roleSchema);
