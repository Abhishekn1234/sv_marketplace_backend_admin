import express,{Request,Response} from "express";
import cors from "cors";
import dotenv from "dotenv";
import Adminauthroutes from "./features/Auth/Routes/authRoutes";
import RoleRoutes from "./features/Roles/Routes/RoleRoutes";
import UserModuleRoutes from "./features/UserModule/Routes/usermodule.routes";
import ModuleRoutes from "./features/Modules/Routes/module.routes";
import UserRoutes from "./features/Users/Routes/users.route";
dotenv.config();

import { mongodbConnection } from "./config/Database/db";

const app = express();
mongodbConnection();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/auth', Adminauthroutes);
app.use('/users/roles',RoleRoutes);
app.use('/admin/usermodule',UserModuleRoutes);
app.use('/users/module',ModuleRoutes);
app.use('/users/crud',UserRoutes);
app.get('/',(req:Request,res:Response)=>{
  res.send("Admin Backend running");
})
// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Admin Server running on port ${PORT}`);
});
