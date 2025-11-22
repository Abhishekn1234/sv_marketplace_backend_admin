import { UserModules,IUserModules, UserModuleService } from "shared-lib";
import { Types } from "mongoose";
import { Request,Response } from "express";

export const UserAddmoduleServices=async(user_group_id:string,module_id:string)=>{
   const useradd=await UserModuleService.createUserModule(user_group_id,module_id);
   return useradd;
}
export const UserFindModuleServices=async(user_group_id:string,module_id:string)=>{
    const userfind=await UserModuleService.findUserModuleByGroupAndModule(user_group_id,module_id);
    return userfind;
}
export const UserModuleUpdateServices=async(id:string,data:Partial<IUserModules>)=>{
    const userupdatemodules=await UserModuleService.updateUserModuleById(id,data)
    return userupdatemodules;
}
export const UserDeleteModuleServices=async(id:string)=>{
    const userdelete=await UserModuleService.deleteUserModuleById(id);
    return userdelete;
}
export const UserFindAllModuleServices=async()=>{
    const userfindall=await UserModuleService.findAllUserModules();
    return userfindall;
}
export const UserFindByIdModuleServices=async(id:string)=>{
    const userfindbyid=await UserModuleService.findUserModuleById(id);
    return userfindbyid;
}
// export const userUpdateModuleServices=async(id:string,data:Partial<IUserModules>,options: object = { new: true })=>{
//     const userupdate=await UserModuleService.(id,data,options);
//     return userupdate;
// }