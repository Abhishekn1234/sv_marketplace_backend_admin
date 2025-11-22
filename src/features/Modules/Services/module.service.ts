import { IModule, Module,UserRole } from "shared-lib";

import { ObjectId,Types } from "mongoose";
import { Modulefunctions } from "shared-lib";


export const ModuleAddServices=async(module:string,modulelanguagekey:string,parent:string,sort:number)=>{
    const moduleAdd=await Module.create({module,modulelanguagekey,parent,sort});
    return moduleAdd;

};
export const ModuleUpdateServices=async(id:string,data:Partial<IModule>)=>{
    const module=await Modulefunctions.updateModule(id,data,{new:true});
    if(!module) throw new Error("Module not found");
    return module;
};
export const ModuleDeleteServices=async(id:string)=>{
    const module=await Modulefunctions.deleteModule(id);
    if(!module) throw new Error("Module not found");
    return module;
};
export const ModuleAll=async()=>{
    const modules=await Modulefunctions.fetchAllModules();
    return modules;
};
export const ModuleById=async(id:string)=>{
    const ModulesById=await Modulefunctions.fetchModuleById(id);
    if(!ModulesById) throw new Error("Module not found");
    return ModulesById;
}


