
import { Request, Response } from "express";
import mongoose from "mongoose";
import {
  RoleAddServices,
  RoleUpdateServices,
  RoleDeleteServices,
} from "../Services/RoleService";
import {
  IModule,
  RoleNameRegex,
  UserRole,
} from "shared-lib";
import {
  UserAddmoduleServices,
  UserDeleteModuleServices,
  UserFindAllModuleServices,
  UserFindByIdModuleServices,
  UserFindModuleServices,
  UserModuleUpdateServices,
} from "../../UserModule/Services/usermodule.services";

// --- CREATE ROLE ---
export const CreateRoleController = async (req: Request, res: Response) => {
  try {
    const { name, module_ids } = req.body;

    if (!RoleNameRegex.test(name)) {
      return res.status(400).json({ message: "Invalid Role Name format; letters only" });
    }

    if (!Array.isArray(module_ids) || module_ids.some(id => !mongoose.Types.ObjectId.isValid(id))) {
      return res.status(400).json({ message: "Invalid module_ids: all must be valid ObjectIds" });
    }

    const role = await RoleAddServices(name);

    await Promise.all(module_ids.map(module_id =>
      UserAddmoduleServices(role._id.toString(), module_id)
    ));

    return res.status(201).json({ _id: role._id, name: role.name, modules: module_ids });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

// --- GET ALL ROLES ---
export const GetRoleController = async (_req: Request, res: Response) => {
  try {
    const allUserModules = await UserFindAllModuleServices();

    const roleMap = new Map<string, { _id: string; name: string; modules: IModule[] }>();

    for (const um of allUserModules) {
      if (!um.user_group_id) continue;

      const role = um.user_group_id as UserRole;
      const modules = Array.isArray(um.module_id) ? um.module_id as IModule[] : [um.module_id as IModule];

      if (!roleMap.has(role._id.toString())) {
        roleMap.set(role._id.toString(), { _id: role._id.toString(), name: role.name, modules: [] });
      }

      const existing = roleMap.get(role._id.toString());
      if (existing) existing.modules.push(...modules);
    }

    const formattedRoles = Array.from(roleMap.values()).map(role => {
  const flattenedModules: Record<string, any> = {};

  role.modules.forEach(mod => {
    // Use module name as key and rest as value
    flattenedModules[mod.module] = {
      modulelanguagekey: mod.modulelanguagekey,
      sort: mod.sort,
      parent: mod.parent,
    };
  });

  return {
    _id: role._id,
    name: role.name,
    ...flattenedModules, // spread modules as top-level keys
  };
});


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
    const userModules = await UserFindAllModuleServices();
    const roleModules = userModules.filter(um => (um.user_group_id as UserRole)._id.toString() === id);

    if (!roleModules.length) return res.status(404).json({ message: "Role not found" });

    const firstRole = roleModules[0].user_group_id as UserRole;
    const modules: IModule[] = roleModules.flatMap(um =>
      Array.isArray(um.module_id) ? um.module_id as IModule[] : [um.module_id as IModule]
    );

    const formattedRole = {
      _id: firstRole._id.toString(),
      name: firstRole.name,
      modules: modules.map(mod => ({
        _id: mod._id,
        module: mod.module,
        modulelanguagekey: mod.modulelanguagekey,
        sort: mod.sort,
        parent: mod.parent,
      })),
    };

    return res.status(200).json(formattedRole);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

// --- UPDATE ROLE ---
export const UpdateRoleController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, module_ids } = req.body;

    if (name && !RoleNameRegex.test(name)) {
      return res.status(400).json({ message: "Invalid Role Name format; letters only" });
    }

    await RoleUpdateServices(id, { name });

    // Delete existing modules for role
    const existingModules = await UserFindAllModuleServices();
    for (const um of existingModules) {
      if ((um.user_group_id as UserRole)._id.toString() === id) {
        await UserDeleteModuleServices((um as any)._id.toString());

      }
    }

    // Add new modules
    if (Array.isArray(module_ids)) {
      await Promise.all(module_ids.map(module_id => UserAddmoduleServices(id, module_id)));
    }

    const updatedRole = await GetRoleByIdController({ params: { id } } as any, res);

    return updatedRole;
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

// --- DELETE ROLE ---
export const DeleteRoleController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Delete all user modules for this role
    const existingModules = await UserFindAllModuleServices();
    for (const um of existingModules) {
      if ((um.user_group_id as UserRole)._id.toString() === id) {
       await UserDeleteModuleServices((um as any)._id.toString());

      }
    }

    const deleted = await RoleDeleteServices(id);

    if (!deleted) return res.status(404).json({ message: "Role not found" });

    return res.status(200).json({ message: "Role deleted successfully" });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};
