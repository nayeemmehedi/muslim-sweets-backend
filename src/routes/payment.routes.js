import express from 'express';
import { paymentCancel, paymentController, paymentFail, paymentIpn, paymentSuccess } from '../controllers/payment.controller.js';


const paymentRoutes = express.Router();

paymentRoutes.post('/init', paymentController)
paymentRoutes.post('/success/:id', paymentSuccess)
paymentRoutes.post('/failed/:id', paymentFail)
paymentRoutes.get('/cancel', paymentCancel)
paymentRoutes.get('/ipn', paymentIpn)







export { paymentRoutes }