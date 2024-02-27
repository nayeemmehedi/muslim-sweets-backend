import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import signup from "../models/authentication.model.js";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse.js";

const GenerateAccessToken = asyncHandler(async (req, res, next) => {
  const refreshToken = await req.cookies.refreshToken;

  if (!refreshToken) {
    throw new ApiError("Token Not Found Please Login");
  }

  let decoded = jwt.verify(refreshToken, process.env.refresh_token_secrat);

  const user = await signup.find({ email: decoded.email });

  const check = refreshToken == user[0].refreshsToken ? true : false;


  if (refreshToken == user[0].refreshsToken) {

    const accessTokenValue = jwt.sign(
      {
        _id: user[0]._id,
        email: user[0].email,
      },
      process.env.accees_token_secrat,
      { expiresIn: "1h" }
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    res
      .cookie("accessToken", accessTokenValue, options)
      .send(
        new ApiResponse(
          200,
          { accessToken: accessTokenValue },
          { success: true }
        )
      );
  } else {
    throw new ApiError("Server Error");
  }
});

export { GenerateAccessToken };
