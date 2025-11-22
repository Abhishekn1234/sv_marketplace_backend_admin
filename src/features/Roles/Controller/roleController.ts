
import { Request, Response } from "express";

import {
  RoleAddServices,
  RoleUpdateServices,
  RoleDeleteServices,
  RoleAll,
  RoleById,
} from "../Services/RoleService";
import { Module, PERMISSION_REGEX, RoleNameRegex, UserModules } from "shared-lib";
import { UserAddmoduleServices } from "../../UserModule/Services/usermodule.services";
import { AuthRequest } from "../../Auth/Middlewares/authMiddleware";
import mongoose from "mongoose";


export const CreateRoleController = async (req: Request, res: Response) => {
  try {
    const { name, module_ids } = req.body;

    if (!RoleNameRegex.test(name)) {
      return res.status(400).json({
        message: "Invalid Role Name format; it should contain letters only",
      });
    }

    // 🔥 CHECK: module_ids must be an array of ObjectIds
    if (
      !Array.isArray(module_ids) ||
      module_ids.some((id) => !mongoose.Types.ObjectId.isValid(id))
    ) {
      return res.status(400).json({
        message: "Invalid module_ids: all module IDs must be valid ObjectId strings",
      });
    }

    // ➤ Create role
    const role = await RoleAddServices(name);

    // ➤ Save module relations
    await Promise.all(
      module_ids.map(async (module_id: string) => {
        await UserAddmoduleServices(role._id.toString(), module_id);
      })
    );

    // ➤ Fetch module details
    const modules = await Module.find({
      _id: { $in: module_ids },
    }).select("_id module modulelanguagekey sort parent");

    return res.status(201).json({
      _id: role._id,
      name: role.name,
      modules,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};




// --- GET ALL ROLES ---
export const GetRoleController = async (_req: Request, res: Response) => {
  try {
    const roles = await UserModules.find()
      .populate("user_group_id")
      .populate("module_id");

    return res.status(200).json(roles);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};


export const GetRoleByIdController = async (req: Request, res:Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid role ID" });
  }

  try {
    const role = await UserModules.findOne({ user_group_id: id })
      .populate("module_id")
      .populate("user_group_id");

    if (!role) return res.status(404).json({ message: "Role not found" });

    return res.status(200).json(role);
  } catch (err:any) {
    return res.status(500).json({ message: err.message });
  }
};


// --- UPDATE ROLE ---
export const UpdateRoleController = async (req: Request, res: Response) => {
  try {
    
    const { name, module_ids,id } = req.body;

    if (name && !RoleNameRegex.test(name)) {
      return res.status(400).json({
        message: "Invalid Role Name format; it should contain letters only"
      });
    }

    // Update role name
    await RoleUpdateServices(id, { name });

    // Update module permissions
    const updatedModules = await UserModules.findOneAndUpdate(
      { user_group_id: id },
      { module_id: module_ids },
      { new: true }
    ).populate("module_id");

    return res.status(200).json({
      _id: id,
      name,
      modules: updatedModules?.module_id
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};


// --- DELETE ROLE ---
export const DeleteRoleController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await RoleDeleteServices(id);

    if (!deleted) {
      return res.status(404).json({ message: "Role not found" });
    }

    return res.status(200).json({ message: "Role deleted successfully" });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};
