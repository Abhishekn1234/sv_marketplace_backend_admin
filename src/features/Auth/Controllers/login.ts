import { Request, Response } from "express";
import { AdminLogin } from "../Services/authservice";

export const AdminAuth = async (req: Request, res: Response) => {
  try {

    const { email, password} = req.body;

    const adminLogin = await AdminLogin(email, password);

    return res.status(200).json(adminLogin);   
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
