import express from "express";
import {protectRoute} from "../middleware/authMiddleware.js";
import {uploader} from "../utils/multer.js";
import {restrictTo} from "../middleware/restrictionMiddleware.js"
import { createContent, deleteContent, fetchAllArticles, 
    fetchAllContent, 
    fetchArticleData, 
    fetchLatestArticles, 
    fetchLatestVideos, 
    fetchVideoData} from "../controllers/contentController.js";

const contentRouter = express.Router();

contentRouter.post('/create',protectRoute,restrictTo(["admin"]),
uploader.fields([{name:"images",maxCount:3},
    {name:"videos",maxCount:1}]),createContent);
contentRouter.get('/articles',fetchAllArticles);
contentRouter.get('/latest-videos',fetchLatestVideos);
contentRouter.delete('/delete/:contentId',protectRoute,restrictTo(["admin"]),
deleteContent);
contentRouter.get('/all',protectRoute,restrictTo(["admin"]),fetchAllContent);
contentRouter.get('/latest-articles',fetchLatestArticles);
contentRouter.get('/article/:articleId',fetchArticleData);
contentRouter.get('/video/:videoId',fetchVideoData)

export default contentRouter;