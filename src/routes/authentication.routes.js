import express from 'express';
import { signupController } from '../controllers/authentication.controller.js';
import { loginController } from '../controllers/login.controller.js';
import { GenerateAccessToken } from '../controllers/generateToken.controller.js';
import uploader from '../middleware/uploader.middleware.js';
import { adminLoginController, adminMain } from '../controllers/adminLogin.controller.js';

const signupRoutes = express.Router();

signupRoutes.post('/signup',uploader.single("imgUrl"), signupController)
// signupRoutes.get('/signup1', signupController1)

signupRoutes.post('/login', loginController)
signupRoutes.post('/adminLogin', adminLoginController)
signupRoutes.post('/admin', adminMain)


signupRoutes.get('/newGenerateAccessToken', GenerateAccessToken)



export { signupRoutes }