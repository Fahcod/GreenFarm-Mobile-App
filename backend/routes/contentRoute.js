import express from "express";
import { validateContentData } from "../lib/validation.js";
import {protectRoute} from "../middleware/authMiddleware.js";
import {restrictTo} from "../middleware/restrictionMiddleware.js"
import { createContent, deleteContent, fetchAllArticles, 
    fetchLatestVideos } from "../controllers/contentController.js";

const contentRouter = express.Router();

contentRouter.post('/create',protectRoute,restrictTo(["admin","expert"]),
validateContentData,createContent);
contentRouter.get('/articles',fetchAllArticles);
contentRouter.get('/latest-videos',fetchLatestVideos);
contentRouter.delete('/delete/:contentId',protectRoute,restrictTo(["admin","expert"]),
deleteContent)

export default contentRouter;