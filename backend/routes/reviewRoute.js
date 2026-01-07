import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import { restrictTo } from "../middleware/restrictionMiddleware.js";
import { addReview, deleteReview, fetchReviews } from "../controllers/reviewController.js";


const reviewRouter = express.Router();

reviewRouter.post('/add/:belongsTo',protectRoute,restrictTo(["farmer"]),addReview);
reviewRouter.delete('/delete/reviewId',protectRoute,restrictTo(["farmer"]),deleteReview);
reviewRouter.get('/fetch',fetchReviews);


export default reviewRouter;