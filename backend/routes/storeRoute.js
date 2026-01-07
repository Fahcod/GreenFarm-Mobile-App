import express from "express";
import { validateStoreData } from "../lib/validation.js";
import { protectRoute } from "../middleware/authMiddleware.js";
import { restrictTo } from "../middleware/restrictionMiddleware.js";
import { createStore, deleteStore, 
fetchStore, updateStoreProfile } from "../controllers/storeController.js";

const storeRouter = express.Router();

storeRouter.post('/create',validateStoreData,protectRoute,restrictTo(["business"]),createStore);
storeRouter.get('/fetch/:storeId',protectRoute,fetchStore);
storeRouter.put('/update-profile/:storeId',protectRoute,restrictTo(["business"]),updateStoreProfile)
storeRouter.delete('/delete/:storeId',protectRoute,restrictTo(["business"]),deleteStore)


export default storeRouter;