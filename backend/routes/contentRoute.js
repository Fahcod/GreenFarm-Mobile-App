import express from "express";
import {protectRoute} from "../middleware/authMiddleware.js";
import {uploader} from "../utils/multer.js";
import {restrictTo} from "../middleware/restrictionMiddleware.js"
import { createContent, deleteContent, fetchAllArticles, 
    fetchAllContent, 
    fetchLatestArticles, 
    fetchLatestVideos } from "../controllers/contentController.js";

const contentRouter = express.Router();

contentRouter.post('/create',protectRoute,restrictTo(["admin"]),
uploader.array("image",3),createContent);
contentRouter.get('/articles',fetchAllArticles);
contentRouter.get('/latest-videos',fetchLatestVideos);
contentRouter.delete('/delete/:contentId',protectRoute,restrictTo(["admin"]),
deleteContent);
contentRouter.get('/all',protectRoute,restrictTo(["admin"]),fetchAllContent);
contentRouter.get('/latest-articles',fetchLatestArticles);

export default contentRouter;