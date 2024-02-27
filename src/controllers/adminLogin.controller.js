import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import bcrypt from "bcrypt";
import { ApiResponse } from "../utils/ApiResponse.js";
import signup from "../models/authentication.model.js";
import adminLogin from "../models/adminLoginmodel.js";

const adminLoginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email && !password ) {
    throw new ApiError("Please enter a valid Credindial..");
  }
  const user = await adminLogin.findOne({ email: email })

  if (!user) {
    throw new ApiError("user Not Matching..");
  }
  if (user.password == password) {
    res.send(new ApiResponse(200, {email:user.email,passwordMatch:true , status :"admin"} , true));
  } else {
    throw new ApiError("Email and Paaword Not Matching man..");
  }
});

export { adminLoginController };
