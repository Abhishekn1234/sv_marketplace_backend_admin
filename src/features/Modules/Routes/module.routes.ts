import  express ,{ Express } from "express";
import { ModuleAllController } from "../Controller/module.controller";
import { protect } from "../../Auth/Middlewares/authMiddleware";


const router=express.Router();

router.get("/", protect,ModuleAllController);

export default router;