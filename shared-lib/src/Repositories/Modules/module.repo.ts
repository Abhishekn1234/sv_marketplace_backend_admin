import {  Module } from "../../Models/module.model";

import { IModule } from "../../Types/Module";


export class Modulefunctions{
    static async addModule(module:string,modulelanguagekey:string,parent:string,sort:number){
        return await Module.create({module,modulelanguagekey,parent,sort});
    }
    static async findByModules(module:string){
        return await Module.findOne({module});
    }
    static async updateModule(id:string,data:Partial<IModule>,options: object = { new: true }){
        return await Module.findByIdAndUpdate(id,data,{new:true});
    }
    static async deleteModule(id:string){
        return await Module.findByIdAndDelete(id);
    }
    static async fetchModuleById(id:string){
        return await Module.findById(id);
    }
    static async fetchAllModules(){
        return await Module.find();
    }

}