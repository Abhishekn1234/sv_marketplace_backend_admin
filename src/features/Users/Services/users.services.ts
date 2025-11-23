import { checkModuleAccess, IUser, userRepo } from "shared-lib";

export const userAddServices = async (data: IUser, loggedInUserId: string) => {
//   await checkModuleAccess(loggedInUserId, "Users Create");
  return await userRepo.createUser(data);
};

export const userFindServices = async (id: string, loggedInUserId: string) => {
//   await checkModuleAccess(loggedInUserId, "Users View");
  return await userRepo.getUserById(id);
};

export const userFindAllServices = async (loggedInUserId: string) => {
//   await checkModuleAccess(loggedInUserId, "Users View");
  return await userRepo.getAllUsers();
};

export const userUpdateServices = async (
  id: string,
  payload: Partial<IUser>,
  loggedInUserId: string
) => {
//   await checkModuleAccess(loggedInUserId, "Users Update");
  return await userRepo.updateUser(id, payload);
};

export const userDeleteServices = async (id: string, loggedInUserId: string) => {
//   await checkModuleAccess(loggedInUserId, "Users Delete");
  return await userRepo.deleteUser(id);
};

export const userVerifyServices = async (id: string, loggedInUserId: string) => {
  await checkModuleAccess(loggedInUserId, "Users Verify");
  return await userRepo.verifyUser(id);
};
