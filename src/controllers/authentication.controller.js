import signup from "../models/authentication.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import cloudinary from "cloudinary";

const signupController =async (req, res, next) => {
  try {
    console.log("req.file.filename", req.file);

  const user = await signup.findOne({ email: req.body?.email });
  if (user) {
    res.send(new ApiResponse(200, { message: "User already login" }, true));
  }

  cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
  });

  const userCreate = new signup(req.body);

  const img_result = await cloudinary.v2.uploader.upload(req.file.path, {
    folder: "sweets",
  });
  userCreate.imgUrl = img_result.url;
  userCreate.imgDetails = img_result;

  const value = await userCreate.save();

  res.send(new ApiResponse(200, { message: "Successfully Login" }, true));
    
  } catch (error) {
    console.log(error)
    res.send({
      message: error.message,
      error: error
    })
    
  }
};

export { signupController };
