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

export function buildRoleMap(userModules: any[]) {
  const map = new Map<string, IModule[]>();

  for (const entry of userModules) {
    const roleId = String(entry.user_group_id);

    if (!map.has(roleId)) {
      map.set(roleId, []);
    }

    for (const mod of entry.module_id || []) {
      map.get(roleId)!.push(mod as IModule);
    }
  }

  return map;
}