import signup from "../models/authentication.model.js";
import product from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import cloudinary from "cloudinary";
import fs from "fs";

const productController = async (req, res) => {
  cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
  });

  try {
    const userCreate = new product(req.body);

    const img_result = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "SweeetProduct",
    });
    userCreate.imgUrl = img_result.url;
    userCreate.imgDetails = img_result;

    fs.unlinkSync(req.file.path);

    const value = await userCreate.save();

    res.send(new ApiResponse(200, { message: "Successfully" }, true));
  } catch (error) {
    console.log(error);
    res.send({
      message: error.message,
      error: error,
    });
  }
};

const productGet = async (req, res, next) => {
  cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
  });
  try {
    const productValue = await product.find({});
    res.send(new ApiResponse(200, { value: productValue }, true));
  } catch (error) {
    res.send({
      message: error.message,
      error: error,
    });
  }
};

export const productGetId = async (req, res, next) => {
  try {

    const productValue = await product.find({ _id: req.params.id });
    res.send(new ApiResponse(200, { value: productValue }, true));
  } catch (error) {
    res.send({
      message: error.message,
      error: error,
    });
  }
};

const productPatch = async (req, res) => {
  cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
  });
  try {

    const user = await product.findById({ _id: req.params.paramId });
    // console.log("user",user)

    if (!user) res.send("User not found");
    if (!req.body && !req.file) {
      res.status(400).send("not found anything..");
    }
    if (req.body) {
      const productBody = await product.findOneAndUpdate(
        { _id: req.params.paramId },
        { $set: req.body },
        { new: true } // Return the modified document
      );
      if (productBody.nModified == 0) {
        res.send("Product not updated");
      }
    }

    if (req.file) {
      await cloudinary.v2.uploader.destroy(user.imgDetails.public_id);

      const img_result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "SweeetProduct",
      });

      const imgSet = await product.findByIdAndUpdate(
        req.params.paramId,
        {
          $set: { imgUrl: img_result.url, imgDetails: img_result },
        },
        { new: true }
      );
    }

    res.json(new ApiResponse(200, { message: "Successfully" }, true));
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message, message: err });
  }
};

const productDelete = async (req, res) => {
  cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
  });

  try {
    const user = await product.findById({ _id: req.params.paramId });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await cloudinary.v2.uploader.destroy(user.imgDetails.public_id);

    const product_delete = await product.findByIdAndDelete({
      _id: req.params.paramId,
    });

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { productController, productGet, productPatch, productDelete };
