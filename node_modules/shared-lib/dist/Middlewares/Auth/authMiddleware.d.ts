import { Request, Response, NextFunction } from "express";
import { IUser } from "../../Models/user.model";
import { Types } from "mongoose";
export type AuthUser = Omit<IUser, "_id"> & {
    _id: Types.ObjectId;
    roleName?: string;
};
export interface AuthRequest extends Request {
    user?: AuthUser;
}
export declare const protect: (req: AuthRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const authorizeRoles: (...roles: string[]) => (req: AuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const isAdmin: (req: AuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const isEmployee: (req: AuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const isCoordinator: (req: AuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const isCustomer: (req: AuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=authMiddleware.d.ts.map