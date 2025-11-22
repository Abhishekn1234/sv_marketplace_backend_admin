import  express, { Express } from "express";
import { UserDeleteModuleController,UserFindByModuleController,UserFindModuleController,UserUpdateModuleController,UseraddModuleController } from "../Controllers/usermodule.controller";
import { isAdmin, protect } from "../../Auth/Middlewares/authMiddleware";
const router=express.Router();

router.post("/add", protect,UseraddModuleController);
router.get("/find/:user_group_id/:module_id",protect,UserFindModuleController); 
router.get("/findall",protect,UserFindByModuleController);
router.delete("/delete/:id",protect,UserDeleteModuleController);
router.put("/update/:id",protect,UserUpdateModuleController);
export default router;