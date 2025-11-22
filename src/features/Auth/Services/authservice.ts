import { AdminAuth } from "../Helpers/authfunctions";
import { emailRegex, generateTokens, sanitizeUser } from "shared-lib";
import { Role } from "shared-lib"; // Role model
import { userRepo } from "shared-lib";
import { getLatestKyc } from "shared-lib";
import { LoginUserResponse } from "shared-lib";

export const AdminLogin = async (
  email: string,
  password: string,
 
) => {
  try {
  const user = await userRepo.findUserByEmail(email);
  if (!user) throw new Error("User not found");
  // console.log(user);
  
  const isMatch = await user.matchPassword(password);
  if (!isMatch) throw new Error("Invalid credentials");
  // console.log(isMatch);
  // const loginModule = await Modulefunctions.findByModules("Login");
  // if (!loginModule) throw new Error("Login module not found");

  // if (!user.user_role) throw new Error("User role not found");

  // const userModuleAccess = await UserModuleService.findUserModuleByGroupAndModule(
  //   user.user_role.toString(),
  //   loginModule._id.toString()
  // );
  // if (!userModuleAccess) throw new Error("User does not have access to the Login module");

  const kyc = await getLatestKyc(user._id.toString());

  const userWithDocuments: LoginUserResponse["user"] = {
    ...sanitizeUser(user.toObject()),
    
  };

  const { accessToken, refreshToken } = generateTokens(user._id.toString());

  return { user: userWithDocuments, accessToken, refreshToken };

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    throw error;
  }
};

