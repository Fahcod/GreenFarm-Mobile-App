import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import { restrictTo } from "../middleware/restrictionMiddleware.js";
import { askQuestion, deleteQuestion, 
    fetchAllQuestions, 
    fetchUserQuestions } from "../controllers/questionController.js";


const questionRouter = express.Router();

questionRouter.post('/ask',protectRoute,restrictTo(["farmer"]),askQuestion);
questionRouter.get('/user',protectRoute,restrictTo(["farmer"]),fetchUserQuestions);
questionRouter.get('/all',fetchAllQuestions)
questionRouter.delete('/delete/:questionId',protectRoute,restrictTo(["farmer"]),
deleteQuestion
);

export default questionRouter;