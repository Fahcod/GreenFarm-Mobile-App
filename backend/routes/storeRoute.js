import express from "express";
import { validateStoreData } from "../lib/validation.js";
import { protectRoute } from "../middleware/authMiddleware.js";
import { restrictTo } from "../middleware/restrictionMiddleware.js";
import { createStore, deleteStore, 
    fetchAllStores, 
    fetchBusinessStores, 
    fetchLatestStores, 
fetchStore, updateStoreProfile } from "../controllers/storeController.js";

const storeRouter = express.Router();

storeRouter.post('/create',validateStoreData,protectRoute,restrictTo(["business"]),createStore);
storeRouter.get('/fetch/:storeId',fetchStore);
storeRouter.put('/update-profile/:storeId',protectRoute,restrictTo(["business"]),updateStoreProfile)
storeRouter.delete('/delete/:storeId',protectRoute,restrictTo(["business"]),deleteStore);
storeRouter.get('/all',fetchAllStores);
storeRouter.get('/latest',fetchLatestStores);
storeRouter.get('/business',protectRoute,fetchBusinessStores);


export default storeRouter;