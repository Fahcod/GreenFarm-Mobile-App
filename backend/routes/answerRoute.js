import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import { restrictTo } from "../middleware/restrictionMiddleware.js";
import { answerQuestion, deleteAnswer, fetchAnswers } from "../controllers/answerController.js";


const answerRouter = express.Router();

answerRouter.post('/add/:questionId',protectRoute,restrictTo(["farmer","expert"]),answerQuestion);
answerRouter.get('/fetch',fetchAnswers);
answerRouter.delete('/delete/:answerId',protectRoute,restrictTo(["farmer","expert"]),
deleteAnswer
)

export default answerRouter;