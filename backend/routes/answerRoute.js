import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import { restrictTo } from "../middleware/restrictionMiddleware.js";
import { answerQuestion, deleteAnswer, fetchAnswers } from "../controllers/answerController.js";


const answerRouter = express.Router();

answerRouter.post('/add/:questionId',protectRoute,restrictTo(["farmer"]),answerQuestion);
answerRouter.get('/fetch',fetchAnswers);
answerRouter.delete('/delete/:answerId',protectRoute,restrictTo(["farmer"]),
deleteAnswer
)

export default answerRouter;