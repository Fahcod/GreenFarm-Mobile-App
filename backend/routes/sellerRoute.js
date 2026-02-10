import express from "express";
import {restrictTo} from "../middleware/restrictionMiddleware.js";
import {protectRoute} from "../middleware/authMiddleware.js";
import { fetchSellerTotals, fetchStoreTotals } from "../controllers/sellerController.js";


const sellerRouter = express.Router();

sellerRouter.get('/totals',protectRoute,restrictTo(["business"]),fetchSellerTotals);
sellerRouter.get('/store-totals/:storeId',protectRoute,restrictTo(["business"]),
fetchStoreTotals
)

export default sellerRouter;