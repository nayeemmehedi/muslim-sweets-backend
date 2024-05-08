import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import bcrypt from "bcrypt";
import { ApiResponse } from "../utils/ApiResponse.js";
import signup from "../models/authentication.model.js";

const loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email && !password) {
    throw new ApiError("Please enter a valid Credindial..");
  }
  const user = await signup.findOne({ email: email });

  console.log("user found",user)

  if (!user) {
    throw new ApiError("Email and Paaword Not Matching..");
  }

  

   const checkPasswordDone = user.passwordCheck(password)

  if (!checkPasswordDone) {
    throw new ApiError("Your password Have Some Issue");
  }

  const accessTokenValue = user.accessToken(user);
  const refreshTokenValue = user.refreshToken(user);
  
    user.refreshsToken = refreshTokenValue;
    await user.save();


  const options = {
    httpOnly: true,
    secure: true,
    
  };

  res
    .cookie("accessToken", accessTokenValue, options)
    .cookie("refreshToken", refreshTokenValue, options)
    .send(
      new ApiResponse(
        200,
        { accessTokenValue, refreshTokenValue ,userName: user.username ,userEmail: email ,img : user.imgUrl},
        "Login Successfully Done"
      )
    );
});





export { loginController};
