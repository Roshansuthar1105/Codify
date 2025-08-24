import  express  from "express";
import * as controllers from "../controllers//authController.js"
import validate from "../middlewares/validateMiddleware.js";
import {signUpSchema,loginSchema,contactSchema} from "../validations/authValidation.js";

const authRouter = express.Router();
authRouter.route("/").get(controllers.homePage)
authRouter.route("/register").post(validate(signUpSchema),controllers.regPage);
authRouter.route("/login").post(validate(loginSchema),controllers.login);
authRouter.route("/send-otp").post(controllers.sendOTP);
authRouter.route("/verify-otp").post(controllers.verifyOTP);

export default authRouter;