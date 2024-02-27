import mongoose from "mongoose";
const { Schema, model } = mongoose;

const productValue = new Schema(
  {
    englishName: {
      type: String,
      minLength: 1,
      maxLength: 40,
      required: true,
    },
    banglaName: {
      type: String,
      minLength: 1,
      maxLength: 40,
      required: true,
    },
    description: {
      type: String,
      minLength: 1,
      maxLength: 100,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    imgUrl: {
      type: String,
      // validate: [validator.isURL, "Please provide img url"],
    },
    imgDetails: mongoose.Schema.Types.Mixed
  },
  {
    timestamps: true,
  }
);

const product = model("product", productValue);

export default product;
