import mongoose, { Document, ObjectId, Schema, Types } from "mongoose";
import { IUser } from "./user.model";
import {   UserRole } from "../Types/Role";
import { Module } from "./module.model";
import { IModule } from "../Types/Module";
import { IUserModules } from "../Types/UserModule";
const moduleSchema= new Schema<IUserModules>({
   user_group_id:{type:Schema.Types.ObjectId,ref:"UserRole"},
  module_id: [{
    type: Schema.Types.ObjectId,
    ref: "Module",
    required: true
  }]
 
});
export const UserModules=mongoose.model<IUserModules>("UserModules",moduleSchema);