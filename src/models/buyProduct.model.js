import mongoose from "mongoose";
import validator from "validator"

const { Schema, model } = mongoose;

const buyProduct = new Schema(
  {
    location: mongoose.Schema.Types.Mixed,
    product: mongoose.Schema.Types.Mixed,

    userEmail: {
      type: String,
      validate: [validator.isEmail, "Please enter a valid email"],
      required: true,
    },
    paymentOptions:{
        type: String,
        required: true,
        enum:["cashONdelivery", "gateway"]
    },
    pay:{
      type:Boolean,
      default: false,

    },
    tran_id: String
  },
  {
    timestamps: true,
  }
);

const buyProducts = model("buyProduct", buyProduct);

export default buyProducts;
