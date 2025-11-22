import { Request, Response } from "express";
import mongoose from "mongoose";

import {
  RoleAddServices,
  RoleUpdateServices,
  RoleDeleteServices,
} from "../Services/RoleService";
import { IModule, UserRole } from "shared-lib";
import { UserModuleService } from "shared-lib";
import { RoleNameRegex } from "shared-lib";

// --- CREATE ROLE ---
export const CreateRoleController = async (req: Request, res: Response) => {
  try {
    const { name, module_ids } = req.body;

    if (!RoleNameRegex.test(name)) {
      return res.status(400).json({
        message: "Invalid Role Name format; it should contain letters only",
      });
    }

    if (!Array.isArray(module_ids) || module_ids.some(id => !mongoose.Types.ObjectId.isValid(id))) {
      return res.status(400).json({
        message: "Invalid module_ids: all module IDs must be valid ObjectId strings",
      });
    }

    // Create role
    const role = await RoleAddServices(name);

    // Assign modules
    await Promise.all(
      module_ids.map(module_id => UserModuleService.createUserModule(role._id.toString(), module_id))
    );

    // Fetch populated modules
    const userModules = await UserModuleService.getUserModuleByRoleId(role._id.toString());

    const modules = userModules.flatMap(m => {
      const mods = Array.isArray(m.module_id) ? (m.module_id as IModule[]) : [(m.module_id as IModule)];
      return mods.map(mod => ({
        _id: mod._id,
        module: mod.module,
        modulelanguagekey: mod.modulelanguagekey,
        sort: mod.sort,
        parent: mod.parent,
      }));
    });

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
    const userModules = await UserModuleService.getAllUserModules();

    const roleMap = new Map<string, { _id: string; name: string; modules: IModule[] }>();

    userModules.forEach(um => {
      if (!um.user_group_id) return;
      const role = um.user_group_id as UserRole;

      const mods = Array.isArray(um.module_id) ? (um.module_id as IModule[]) : [(um.module_id as IModule)];

      if (!roleMap.has(role._id.toString())) {
        roleMap.set(role._id.toString(), { _id: role._id.toString(), name: role.name, modules: [] });
      }

      roleMap.get(role._id.toString())?.modules.push(...mods);
    });

    const formattedRoles = Array.from(roleMap.values()).map(role => ({
      ...role,
      modules: role.modules.map(mod => ({
        _id: mod._id,
        module: mod.module,
        modulelanguagekey: mod.modulelanguagekey,
        sort: mod.sort,
        parent: mod.parent,
      })),
    }));

    return res.status(200).json(formattedRoles);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

// --- GET ROLE BY ID ---
export const GetRoleByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid role ID" });
  }

  try {
    const userModules = await UserModuleService.getUserModuleByRoleId(id);

    if (!userModules.length) return res.status(404).json({ message: "Role not found" });

    const role = userModules[0].user_group_id as UserRole;

    const modules = userModules.flatMap(um => {
      const mods = Array.isArray(um.module_id) ? (um.module_id as IModule[]) : [(um.module_id as IModule)];
      return mods.map(mod => ({
        _id: mod._id,
        module: mod.module,
        modulelanguagekey: mod.modulelanguagekey,
        sort: mod.sort,
        parent: mod.parent,
      }));
    });

    return res.status(200).json({
      _id: role._id.toString(),
      name: role.name,
      modules,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

// --- UPDATE ROLE ---
export const UpdateRoleController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, module_ids } = req.body;

  try {
    if (name && !RoleNameRegex.test(name)) {
      return res.status(400).json({ message: "Invalid Role Name format; it should contain letters only" });
    }

    // Update role name
    await RoleUpdateServices(id, { name });

    // Update modules if provided
    if (Array.isArray(module_ids)) {
      await UserModuleService.updateUserModulesByRoleId(id, module_ids);
    }

    // Fetch updated modules
    const updatedModules = await UserModuleService.getUserModuleByRoleId(id);

    const modules = updatedModules.flatMap(m => {
      const mods = Array.isArray(m.module_id) ? (m.module_id as IModule[]) : [(m.module_id as IModule)];
      return mods.map(mod => ({
        _id: mod._id,
        module: mod.module,
        modulelanguagekey: mod.modulelanguagekey,
        sort: mod.sort,
        parent: mod.parent,
      }));
    });

    return res.status(200).json({
      _id: id,
      name,
      modules,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

// --- DELETE ROLE ---
export const DeleteRoleController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deleted = await RoleDeleteServices(id);

    if (!deleted) return res.status(404).json({ message: "Role not found" });

    // Delete associated modules
    await UserModuleService.deleteUserModulesByRoleId(id);

    return res.status(200).json({ message: "Role deleted successfully" });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};
