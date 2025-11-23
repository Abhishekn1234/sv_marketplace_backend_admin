import { Request, Response } from "express";
import { emailRegex, IUser, passwordRegex, phoneRegex, userRepo } from "shared-lib";

import {
  userAddServices,
  userFindServices,
  userFindAllServices,
  userUpdateServices,
  userDeleteServices,
  userVerifyServices,
} from "../Services/users.services";

import { AuthRequest } from "../../Auth/Middlewares/authMiddleware";

export const createUserController = async (req: AuthRequest, res: Response) => {
  try {
    const loggedInUserId = req.user?._id?.toString();
    if (!loggedInUserId) throw new Error("Unauthorized");

    const userData: IUser = req.body;

    const emails = await userRepo.findUserByEmail(userData.email);
    if (emails) throw new Error("Email already exists");

    const phones = await userRepo.findUserByPhone(userData.phone);
    if (phones) throw new Error("Phone number already exists");

    if (userData.email && !emailRegex.test(userData.email))
      throw new Error("Invalid email format");

    if (userData.phone && !phoneRegex.test(userData.phone))
      throw new Error("Invalid phone number format");

    if (userData.password && !passwordRegex.test(userData.password))
      throw new Error("Invalid password format");

    const newUser = await userAddServices(userData, loggedInUserId);
    return res.status(201).json(newUser);

  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserController = async (req: AuthRequest, res: Response) => {
  try {
    const loggedInUserId = req.user?._id?.toString();
    if (!loggedInUserId) throw new Error("Unauthorized");

    const user = await userFindServices(req.params.id, loggedInUserId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json(user);

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Error fetching user",
    });
  }
};

export const getAllUsersController = async (req: AuthRequest, res: Response) => {
  try {
    const loggedInUserId = req.user?._id?.toString();
    if (!loggedInUserId) throw new Error("Unauthorized");

    const users = await userFindAllServices(loggedInUserId);
    return res.json(users);

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Error fetching users",
    });
  }
};


export const updateUserController = async (req: AuthRequest, res: Response) => {
  try {
    const loggedInUserId = req.user?._id?.toString();
    if (!loggedInUserId) throw new Error("Unauthorized");

    const updatedUser = await userUpdateServices(
      req.params.id,
      req.body,
      loggedInUserId
    );

    return res.json(updatedUser);

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Error updating user",
    });
  }
};


export const deleteUserController = async (req: AuthRequest, res: Response) => {
  try {
    const loggedInUserId = req.user?._id?.toString();
    if (!loggedInUserId) throw new Error("Unauthorized");

    await userDeleteServices(req.params.id, loggedInUserId);

    return res.json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Error deleting user",
    });
  }
};


export const verifyUserController = async (req: AuthRequest, res: Response) => {
  try {
    const loggedInUserId = req.user?._id?.toString();
    if (!loggedInUserId) throw new Error("Unauthorized");

    const updated = await userVerifyServices(req.params.id, loggedInUserId);

    return res.json({
      success: true,
      message: "User verified successfully",
      data: updated,
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Error verifying user",
    });
  }
};
