import express from "express";
import {protectRoute} from "../middleware/authMiddleware.js";
import {restrictTo} from "../middleware/restrictionMiddleware.js"
import { createAdvert, deleteAdvert, fetchAdverts } from "../controllers/advertController.js";
import {uploader} from "../utils/fileUploader.js"

const advertRouter = express.Router();

advertRouter.post('/create',protectRoute,restrictTo(["admin"]),uploader.single("image"),
createAdvert);
advertRouter.get('/fetch',protectRoute,fetchAdverts);
advertRouter.delete('delete/:advertId',protectRoute,deleteAdvert);


export default advertRouter;