import { IModule } from "../../Types/Module";
export declare class Modulefunctions {
    static addModule(module: string, modulelanguagekey: string, parent: string, sort: number): Promise<import("mongoose").Document<unknown, {}, IModule, {}, {}> & IModule & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    static findByModules(module: string): Promise<(import("mongoose").Document<unknown, {}, IModule, {}, {}> & IModule & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    static updateModule(id: string, data: Partial<IModule>, options?: object): Promise<(import("mongoose").Document<unknown, {}, IModule, {}, {}> & IModule & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    static deleteModule(id: string): Promise<(import("mongoose").Document<unknown, {}, IModule, {}, {}> & IModule & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    static fetchModuleById(id: string): Promise<(import("mongoose").Document<unknown, {}, IModule, {}, {}> & IModule & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    static fetchAllModules(): Promise<(import("mongoose").Document<unknown, {}, IModule, {}, {}> & IModule & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
}
//# sourceMappingURL=module.repo.d.ts.map