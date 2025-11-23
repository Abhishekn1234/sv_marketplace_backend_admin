import mongoose from "mongoose";
import { IModule, UserModuleService, UserRole } from "shared-lib";

export const validateModuleIds = (module_ids: any[]) => {
  if (
    !Array.isArray(module_ids) ||
    module_ids.some((id) => !mongoose.Types.ObjectId.isValid(id))
  ) {
    return {
      success: false,
      message: "Invalid module_ids: all module IDs must be valid ObjectId strings",
    };
  }

  return { success: true };
};

export const createRoleModules = async (roleId: string, moduleIds: string[]) => {
  await Promise.all(
    moduleIds.map((module_id) =>
      UserModuleService.createUserModule(roleId, module_id)
    )
  );
};

export const formatModules = (userModules: any[]) => {
  return userModules.flatMap((m) => {
    const mods = Array.isArray(m.module_id)
      ? (m.module_id as IModule[])
      : [(m.module_id as IModule)];

    return mods.map((mod) => ({
      _id: mod._id,
      module: mod.module,
      modulelanguagekey: mod.modulelanguagekey,
      sort: mod.sort,
      parent: mod.parent,
    }));
  });
};

export const extractRoleModules = (userModules: any[]) => {
  const raw = formatModules(userModules);

  return Array.from(new Map(raw.map((m) => [m._id.toString(), m])).values());
};

export const buildRoleMap = (userModules: any[]) => {
  const roleMap = new Map<
    string,
    { _id: string; name: string; modules: IModule[] }
  >();

  userModules.forEach((um) => {
    if (!um.user_group_id) return;

    const role = um.user_group_id as UserRole;

    const mods = Array.isArray(um.module_id)
      ? (um.module_id as IModule[])
      : [(um.module_id as IModule)];

    if (!roleMap.has(role._id.toString())) {
      roleMap.set(role._id.toString(), {
        _id: role._id.toString(),
        name: role.name,
        modules: [],
      });
    }

    roleMap.get(role._id.toString())?.modules.push(...mods);
  });

  return roleMap;
};
