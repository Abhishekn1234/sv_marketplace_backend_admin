// import jwt from "jsonwebtoken";
// import { Request, Response, NextFunction } from "express";
// import { User, IUser } from "shared-lib";

// export interface AuthRequest extends Request {
//   user?: IUser;
// }

// /**
//  * -------------------------------
//  * 🔐 PROTECT MIDDLEWARE
//  * -------------------------------
//  * Validates JWT and attaches user to req.user
//  */
// export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
//   try {
//     let token;

//     // Extract Bearer token
//     if (req.headers.authorization?.startsWith("Bearer")) {
//       token = req.headers.authorization.split(" ")[1];
//     }

//     if (!token) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     // Verify token
//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_ACCESS_SECRET as string
//     ) as { id: string };

//     // Fetch user (without password)
//     const user = await User.findById(decoded.id).select("-password");

//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     // Attach user to request
//     req.user = user;

//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// };

// /**
//  * -------------------------------
//  * 🔐 AUTHORIZE ROLES
//  * -------------------------------
//  * Allows access only if the user has one of the allowed roles
//  */
// export const authorizeRoles = (...allowedRoles: string[]) => {
//   return (req: AuthRequest, res: Response, next: NextFunction) => {
//     if (!req.user) {
//       return res.status(401).json({ message: "Not authenticated" });
//     }

//     const userRole = req.user.user_role?.toString(); 

//     if (!userRole) {
//       return res.status(403).json({ message: "User has no role assigned" });
//     }

//     if (!allowedRoles.includes(userRole)) {
//       return res.status(403).json({
//         message: `Access denied for role: ${userRole}`,
//       });
//     }

//     next();
//   };
// };

// /**
//  * -------------------------------
//  * SHORTCUT ROLE GUARDS
//  * -------------------------------
//  */

// export const isAdmin = authorizeRoles("admin");

// export const isEmployee = authorizeRoles("employee", "admin");

// export const isCoordinator = authorizeRoles("coordinator", "admin");

// export const isCustomer = authorizeRoles("customer", "admin", "employee");



import { Request, Response, NextFunction } from "express";
import { User, Role, IUser } from "shared-lib";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: IUser & { roleName?: string };
}

/**
 * -------------------------------
 * 🔐 PROTECT MIDDLEWARE
 * -------------------------------
 * Validates JWT and attaches user to req.user with roleName
 */
export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string) as { id: string };
    const user = await User.findById(decoded.id)
      .select("-password")
      .populate("user_role"); // populate role document

    if (!user) return res.status(401).json({ message: "User not found" });

    // Attach roleName dynamically
   if (user.user_role && typeof user.user_role !== "string") {
  (user as any).roleName = (user.user_role as any).name; // attach dynamically
}
req.user = user
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

/**
 * -------------------------------
 * 🔐 AUTHORIZE ROLES
 * -------------------------------
 * Checks if req.user.roleName is in allowedRoles
 */
export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ message: "Not authenticated" });

    const userRoleName = req.user.roleName;
    if (!userRoleName) return res.status(403).json({ message: "User has no role assigned" });

    if (!allowedRoles.includes(userRoleName)) {
      return res.status(403).json({
        message: `Access denied for role: ${userRoleName}`,
      });
    }

    next();
  };
};

/**
 * -------------------------------
 * 🔐 DYNAMIC SHORTCUT ROLE GUARDS
 * -------------------------------
 * Can be generated dynamically if needed
 */
export const isAdmin = authorizeRoles("admin");
export const isEmployee = authorizeRoles("employee", "admin");
export const isCoordinator = authorizeRoles("coordinator", "admin");
export const isCustomer = authorizeRoles("customer", "admin", "employee");
export const isSuperAdmin = authorizeRoles("superadmin"); 
