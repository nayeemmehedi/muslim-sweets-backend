import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import buyProducts from "../models/buyProduct.model.js";

const buyProductController = asyncHandler(async (req, res) => {
  try {
    const values = req.body;

    const buy = new buyProducts(values);
    const value = await buy.save();
    res.send(new ApiResponse(200, { message: "Successfully" }, true));
  } catch (error) {
    res.send({
      message: error.message,
      error: error,
    });
  }
});

export { buyProductController };
