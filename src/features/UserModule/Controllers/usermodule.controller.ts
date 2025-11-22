import { Request,Response } from "express";
import { UserModules,IUserModules } from "shared-lib";
import { UserAddmoduleServices, UserDeleteModuleServices, UserFindAllModuleServices, UserFindModuleServices, UserModuleUpdateServices } from "../Services/usermodule.services";


export const UseraddModuleController=async(req:Request,res:Response)=>{
 try{
    const {user_group_id,module_id}=req.body;
     const useraddmodule=await UserAddmoduleServices(user_group_id,module_id);
    res.status(201).json(useraddmodule);

 }catch(err:any){
    console.log(err);
    res.status(500).json({message:err.message});
 }
};
export const UserFindModuleController=async(req:Request,res:Response)=>{
    try{
     const userfindmoduleByidcontroller=await UserFindModuleServices(req.params.user_group_id,req.params.module_id);
     res.status(200).json(userfindmoduleByidcontroller);
    }catch(err:any){
        console.log(err);
        res.status(500).json({message:err.message});
    
    }
}
export const UserFindByModuleController=async(req:Request,res:Response)=>{
    try{
        const userFindController=await UserFindAllModuleServices();
        res.status(200).json(userFindController);

    }catch(err:any){
        console.log(err);
        res.status(500).json({message:err.message});
    }
}
export const UserDeleteModuleController=async(req:Request,res:Response)=>{
    try{
     const deletedmodule=await UserDeleteModuleServices(req.params.id);
     res.json(200).json(deletedmodule);

    }catch(err:any){
        console.log(err);
        res.status(500).json({message:err.message});
    
    }
}
export const UserUpdateModuleController=async(req:Request,res:Response)=>{
    try{
    const userupdatemodulecontroller=await UserModuleUpdateServices(req.params.id,req.body);
    res.status(200).json(userupdatemodulecontroller);
    }catch(err:any){
        console.log(err);
        res.status(500).json({message:err.message});
    
    }
}