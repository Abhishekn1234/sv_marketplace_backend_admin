import { Module, UserRole, UserModules } from "shared-lib";
import { ObjectId, Types } from "mongoose";
import { Request, Response } from "express";
import { ModuleAddServices, ModuleById, ModuleDeleteServices, ModuleUpdateServices } from "../Services/module.service";

export const ModuleAddController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { module, modulelanguagekey, parent, sort } = req.body;

    const moduleAdd = await ModuleAddServices(
      module,
      modulelanguagekey,
      parent,
      sort
    );

    res.status(201).json(moduleAdd);
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
export const ModuleUpdateController=async(req:Request,res:Response)=>{
    try{
    const modulesexists=await ModuleById(req.params.id);
    if(!modulesexists) throw new Error("Module not found");
    const moduleupdate=await ModuleUpdateServices(req.params.id,req.body);
     res.json(moduleupdate);
    }catch(err:any){
        console.log(err);
        res.status(500).json({message:err.message});
    }
};
export const ModuleDeleteController=async(req:Request,res:Response)=>{
    try{ 
      const modulesexists=await ModuleById(req.params.id);
      if(!modulesexists) throw new Error("Module not found");
      const moduledelete=await ModuleDeleteServices(req.params.id);
      res.json(moduledelete);
    }catch(err:any){
        console.log(err);
    res.status(500).json({message:err.message});
    
    };
}

export const ModuleAllController=async(req:Request,res:Response)=>{
    try{
        const modules=await Module.find();
        res.json(modules);
    }catch(err:any){
        console.log(err);
        res.status(500).json({message:err.message});
    }

};
export const ModuleByIdController=async(req:Request,res:Response)=>{
    try{
        const modules=await ModuleById(req.params.id);
        res.json(modules);
    }catch(err:any){
        console.log(err);
        res.status(500).json({message:err.message});
    
    }
}