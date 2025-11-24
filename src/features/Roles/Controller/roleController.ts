import { Request, Response } from "express";
import mongoose from "mongoose";
import {
  RoleAddServices,
  RoleUpdateServices,
  RoleDeleteServices,
} from "../Services/RoleService";
import { IModule, UserRole, UserModuleService, RoleNameRegex, Rolefunctions } from "shared-lib";

import {
  formatModules,
  validateModuleIds,
  createRoleModules,
  buildRoleMap,
  extractRoleModules,
} from "../../../utils/role";

export const CreateRoleController = async (req: Request, res: Response) => {
  try {
    const { name, module_ids } = req.body;

    if (!RoleNameRegex.test(name)) {
      return res.status(400).json({
        message: "Invalid Role Name format; it should contain letters only",
      });
    }

    const valid = validateModuleIds(module_ids);
    if (!valid.success) {
      return res.status(400).json({ message: valid.message });
    }

    const role = await RoleAddServices(name);

    await createRoleModules(role._id.toString(), module_ids);

    const userModules = await UserModuleService.getUserModuleByRoleId(
      role._id.toString()
    );

    return res.status(201).json({
      _id: role._id,
      name: role.name,
      modules: formatModules(userModules),
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};



export const GetRoleController = async (_req: Request, res: Response) => {
  try {
    const roles = await Rolefunctions.fetchRoles();
    const userModules = await UserModuleService.getAllUserModules();

    const roleModuleMap = buildRoleMap(userModules); // always Map<string, IModule[]>

    const response = roles.map((role) => {
      const roleModules = roleModuleMap.get(String(role._id)) || [];

      return {
        _id: role._id,
        name: role.name,
        modules: roleModules.map((mod) => ({
          _id: mod._id,
          module: mod.module,
          modulelanguagekey: mod.modulelanguagekey,
          sort: mod.sort,
          parent: mod.parent,
        }))
      };
    });

    return res.status(200).json(response);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};




export const GetRoleByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid role ID" });
  }

  try {
    const userModules = await UserModuleService.getUserModuleByRoleId(id);

    if (!userModules.length)
      return res.status(404).json({ message: "Role not found" });

    const role = userModules[0].user_group_id as UserRole;

    return res.status(200).json({
      _id: role._id,
      name: role.name,
      modules: formatModules(userModules),
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const UpdateRoleController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, module_ids } = req.body;

  try {
    if (name && !RoleNameRegex.test(name)) {
      return res.status(400).json({
        message: "Invalid Role Name format; it should contain letters only",
      });
    }

    if (name) {
      await RoleUpdateServices(id, { name });
    }

    if (Array.isArray(module_ids)) {
      await UserModuleService.updateUserModulesByRoleId(id, module_ids);
    }

    const modulesClean = extractRoleModules(
      await UserModuleService.getUserModuleByRoleId(id)
    );

    return res.status(200).json({
      _id: id,
      name,
      modules: modulesClean,
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const DeleteRoleController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deleted = await RoleDeleteServices(id);

    if (!deleted) return res.status(404).json({ message: "Role not found" });

    await UserModuleService.deleteUserModulesByRoleId(id);

    return res.status(200).json({ message: "Role deleted successfully" });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
