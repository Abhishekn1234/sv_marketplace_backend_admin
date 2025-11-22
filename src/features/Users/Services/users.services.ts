import { IUser,User } from "shared-lib";
import { Request,Response } from "express";
import { userRepo } from "shared-lib";

export const userAddServices=async(req:Request,res:Response)=>{
    const useradd=await userRepo.createUser(req.body);
    return useradd;
}
export const userFindServices=async(req:Request,res:Response)=>{
    const userfind=await userRepo.getUserById(req.params.id);
    return userfind;
}
export const userFindAllServices=async(req:Request,res:Response)=>{
    const userfindall=await userRepo.getAllUsers();
   return userfindall;
}
export const userDeleteServices=async(req:Request,res:Response)=>{
    const userdelete=await userRepo.deleteUser(req.params.id); 
    return userdelete;
}