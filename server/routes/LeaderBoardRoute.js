import express from "express";
import { fetchLeaderboard } from "../controllers/leaderboard.controller.js";

const router = express.Router();

router.get("/leaderboard", fetchLeaderboard);

export default router;
