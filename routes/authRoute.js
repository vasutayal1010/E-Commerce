import express from "express";
import {
  registerController,
  loginController,
  testController,
  updateProfileController,
  getAllOrdersController,
  getOrdersController,
  orderStatusController,
} from "../controller/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { forgotPasswordController } from "../controller/authController.js";

const router = express.Router();

router.post("/register", registerController);

//Login
router.post("/login", loginController);

//Forgot password
router.post('/forgot-password',forgotPasswordController)

//test-route
router.get("/test", requireSignIn,isAdmin, testController);

//protected User route auth
router.get('/user-auth',requireSignIn,(req,res)=>{
  res.status(200).send({ok:true});
});

//protected Admin route auth
router.get("/admin-auth", requireSignIn,isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);


export default router;
