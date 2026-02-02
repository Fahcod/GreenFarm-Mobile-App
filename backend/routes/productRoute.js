import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import { restrictTo } from "../middleware/restrictionMiddleware.js";
import { createNewProduct, deleteProduct, fetchByCategory, fetchProduct, fetchProducts, 
    fetchStorePoducts, 
fetchSuggestedProducts } from "../controllers/productController.js";
import {uploader} from "../utils/multer.js"

const productRouter = express.Router();

productRouter.get('/from-store',fetchStorePoducts);
productRouter.get('/fetch',fetchProducts);

productRouter.post('/create/:storeId',protectRoute,restrictTo(["business"]),
uploader.array("images",2),createNewProduct
);
productRouter.delete('/delete/:storeId/:productId',protectRoute,
    restrictTo(["business"]),deleteProduct);

productRouter.get('/suggested',fetchSuggestedProducts);
productRouter.get('/product/:productId',fetchProduct);
productRouter.get('/category/:category',fetchByCategory)

export default productRouter;