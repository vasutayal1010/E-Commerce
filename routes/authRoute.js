import express from "express";
import {
  registerController,
  loginController,
  testController,
} from "../controller/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { forgotPasswordController } from "../controller/authController.js";

const router = express.Router();

router.post("/register", registerController);

//Login
router.post("/login", loginController);

//Forgot password
router.post('/forgot-password',forgotPasswordController)

router.get("/test", requireSignIn,isAdmin, testController);
router.get('/user-auth',requireSignIn,(req,res)=>{
  res.status(200).send({ok:true});
})

export default router;
