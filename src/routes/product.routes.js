import { productController, productDelete, productGet, productGetId, productPatch } from '../controllers/product.controller.js';

import express from  'express';
import uploader from '../middleware/uploader.middleware.js';

const productRoutes = express.Router();

productRoutes.post("/",uploader.single("imgUrl"),productController)
productRoutes.get("/",productGet)
productRoutes.get("/:id",productGetId)

productRoutes.patch("/:paramId",uploader.single("imgUrl"),productPatch)
productRoutes.delete("/:paramId",uploader.single("imgUrl"),productDelete)




export {productRoutes}