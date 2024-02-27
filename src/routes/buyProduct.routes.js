import express from "express";
import { buyProductController } from "../controllers/buyProduct.controller.js";

const buyProduct = express.Router();

buyProduct.post("/buyProduct", buyProductController);

export { buyProduct };
