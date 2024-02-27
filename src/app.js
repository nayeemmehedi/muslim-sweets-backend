import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { signupRoutes } from "./routes/authentication.routes.js";
import { userVerify } from "./utils/userVerify.js";
import { paymentRoutes } from "./routes/payment.routes.js";
import { productRoutes } from "./routes/product.routes.js";
import { buyProduct } from "./routes/buyProduct.routes.js";

dotenv.config();

const app = express();


app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static("public/temp"))

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(cookieParser());


app.get("/",(req, res) => {
  res.send("Welcome");
});


  app.get("/api",userVerify,(req, res) => {
  res.send("Welcome");
});



app.use("/api/v1", signupRoutes)
app.use("/api/v1/payment", paymentRoutes)
app.use("/api/v1/product", productRoutes)
app.use("/api/v1/buy", buyProduct)



export { app };
