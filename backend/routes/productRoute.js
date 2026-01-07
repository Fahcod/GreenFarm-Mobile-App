import express from "express";
import { validateProductData } from "../lib/validation.js";
import { protectRoute } from "../middleware/authMiddleware.js";
import { restrictTo } from "../middleware/restrictionMiddleware.js";
import { createNewProduct, deleteProduct, fetchProducts } from "../controllers/productController.js";

const productRouter = express.Router();


productRouter.get('/from-store',protectRoute,restrictTo(["admin","business","farmer"]),
fetchProducts);

productRouter.get('/fetch',protectRoute,restrictTo(["admin","business","farmer"]),
fetchProducts);

productRouter.post('/create/:storeId',protectRoute,restrictTo(["business"]),
    validateProductData,
    createNewProduct
);

productRouter.delete('/delete/:storeId/:productId',protectRoute,
    restrictTo(["business"]),
    deleteProduct
)

export default productRouter;