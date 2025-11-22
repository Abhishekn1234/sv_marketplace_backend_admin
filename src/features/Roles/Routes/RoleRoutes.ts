import e from "express";
import { CreateRoleController,DeleteRoleController,GetRoleByIdController,GetRoleController,UpdateRoleController } from "../Controller/roleController";

import express from "express";
import { protect } from "../../Auth/Middlewares/authMiddleware";
const router=express.Router();

router.post('/create',protect,CreateRoleController);
router.get('/all',protect,GetRoleController);
router.get('/:id',protect,GetRoleByIdController);
router.put('/update',protect,UpdateRoleController);
router.delete('/:id/delete',protect,DeleteRoleController);

export default router;