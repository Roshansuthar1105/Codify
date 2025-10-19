import express from "express";
import { fetchLeaderboard } from "../controllers/leaderboardController.js";

const leaderBoardRoute = express.Router();

leaderBoardRoute.get("/leaderboard", fetchLeaderboard);

export default leaderBoardRoute;