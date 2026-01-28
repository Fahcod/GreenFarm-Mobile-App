import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import {restrictTo} from "../middleware/restrictionMiddleware.js"
import { getAdminTotals } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.get('/totals',protectRoute,restrictTo(["admin"]),getAdminTotals);

export default adminRouter;