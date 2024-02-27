import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { configValue } from "../config/index.js";
import validator from "validator"

const { Schema, model } = mongoose;

const signupValue = new Schema({

 
  username: {
    type: String,
    minLength: 1,
    maxLength: 20,
    required: true,
  },

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
  confirmPassword: {
    type: String,
    // required: true,
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "Password dont match",
    },
  },
  imgUrl: {
    type: String,
    // validate: [validator.isURL, "Please provide img url"],
  },
  imgDetails: Schema.Types.Mixed,
  status :{
    type : String,
    default : "customer",
    enum:["customer"]
  },
  
  refreshsToken: String,
  payment: Schema.Types.Mixed

  },
  {
    timestamps: true,
  }
);

signupValue.pre("save",async function (next) {
  
  const hash =await bcrypt.hash(this.password, 10);

  this.password = hash;
  this.confirmPassword = undefined;

  next();
});

signupValue.method("passwordCheck", async function (password) {
  const match = await bcrypt.compare(password, this.password);
  return match;
});

signupValue.methods.accessToken = (data) => {
  return jwt.sign(
    {
      _id: data._id,
      email: data.email,
    },
    process.env.accees_token_secrat,
    { expiresIn: "30s" }
  );
};

signupValue.methods.refreshToken = (data) => {
  return jwt.sign(
    {
      _id: data._id,
      email: data.email,
    },
    process.env.refresh_token_secrat,
    { expiresIn: "30d" }
  );
};

const signup = model("signup", signupValue);

export default signup;
