import express from "express";
import { AdminAuth } from "../Controllers/login";

const router = express.Router();

router.post("/login", AdminAuth); // AdminAuth is a function

export default router;
