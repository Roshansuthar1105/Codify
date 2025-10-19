import { Router } from "express";
import { subscribe } from "../controllers/newsletterController.js";

const router = Router();

router.post("/subscribe", subscribe);

export default router;
