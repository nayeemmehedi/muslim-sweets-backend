import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { configValue } from "../config/index.js";
import validator from "validator";

const { Schema, model } = mongoose;

const Login = new Schema(
  {
    email: {
      type: String,
      validate: [validator.isEmail, "Please enter a valid email"],
      required: true,
    },

    password: {
      type: String,
      // validate: {
      //   validator: (value) =>
      //     validator.isStrongPassword(value, {
      //       minLength: 6,
      //       // minLowercase: 1,
      //       // minNumber: 1,
      //       // minUppercase: 1,
      //       // minSymbols: 1,
      //     }),
      //   message: "Password {VALUE} is not Strong.",
      // },
      required: true,
    },

    status: {
      type: String,
      default: "admin",
      enum: ["admin"],
    },
  },
  {
    timestamps: true,
  }
);

const adminLogin = model("adminLogin", Login);

export default adminLogin;
