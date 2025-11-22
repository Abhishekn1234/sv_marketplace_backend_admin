"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modulefunctions = void 0;
const module_model_1 = require("../../Models/module.model");
class Modulefunctions {
    static async addModule(module, modulelanguagekey, parent, sort) {
        return await module_model_1.Module.create({ module, modulelanguagekey, parent, sort });
    }
    static async findByModules(module) {
        return await module_model_1.Module.findOne({ module });
    }
    static async updateModule(id, data, options = { new: true }) {
        return await module_model_1.Module.findByIdAndUpdate(id, data, { new: true });
    }
    static async deleteModule(id) {
        return await module_model_1.Module.findByIdAndDelete(id);
    }
    static async fetchModuleById(id) {
        return await module_model_1.Module.findById(id);
    }
    static async fetchAllModules() {
        return await module_model_1.Module.find();
    }
}
exports.Modulefunctions = Modulefunctions;
