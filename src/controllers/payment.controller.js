import SSLCommerzPayment from "sslcommerz-lts";
import { ApiResponse } from "../utils/ApiResponse.js";
import signup from "../models/authentication.model.js";
import mongoose from "mongoose";
import buyProducts from "../models/buyProduct.model.js";

//sslcommerz init
async function paymentController(req, res) {
  const newObjectId = new mongoose.Types.ObjectId();

  const objectIdString = newObjectId.toString();
  const data = {
    tran_id: objectIdString, // use unique tran_id for each api call
    success_url: `${process.env.localhost}/api/v1/payment/success/${objectIdString}`,
    fail_url: `${process.env.localhost}/api/v1/payment/failed/${objectIdString}`,
    cancel_url: `${process.env.localhost}/payment/cancel`,
    ipn_url: `${process.env.localhost}/payment/ipn`,
    shipping_method: "gateway",
    product: req.body,

    total_amount: 100,
    currency: "BDT",

    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: "Customer Name",
    cus_email: "customer@example.com",
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };

  const sslcz = new SSLCommerzPayment(
    process.env.payment_token_secrat,
    process.env.payment_token_secrat_password,
    false
  );

  sslcz.init(data).then((apiResponse) => {
    let GatewayPageURL = apiResponse.GatewayPageURL;

    const valueapi = { ...data.product, tran_id: data.tran_id };

    const value = new buyProducts(valueapi);
    value.save()

    res.send(
      new ApiResponse(
        200,
        { gateway: GatewayPageURL, data: data },
        "Use Start Payment Gateway"
      )
    );
    //     console.log('Redirecting to: ', GatewayPageURL)
  });
}

async function paymentSuccess(req, res) {

  console.log("Payment Success id",req.params.id);


  
 
  try {
    const data = await buyProducts.updateOne(
      { tran_id: req.params.id },
      { $set: { pay: true } }
    );

    console.log("data: ", data)

    res.redirect("http://localhost:3000/payment-success")

  
  } catch (error) {
    res.send("error: " + error.message)
  }
}

async function paymentFail(req, res) {
  try {
    const payment = await homeSchemaValue.findByIdAndDelete({tran_id: req.params.id});
    if (!payment) {
      return res.status(404).json({ message: "payment not found" });
    }
    res.redirect("http://localhost:3000/payment-failed");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

}

async function paymentCancel(req, res) {}

async function paymentIpn(req, res) {}

export {
  paymentController,
  paymentSuccess,
  paymentFail,
  paymentCancel,
  paymentIpn,
};
