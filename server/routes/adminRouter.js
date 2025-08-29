import express from "express";
import * as adminController from "../controllers/adminController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
const adminRouter = express.Router();
adminRouter
  .route("/users")
  .get(authMiddleware, adminMiddleware, adminController.getAllUsers);
adminRouter
  .route("/contacts")
  .get(authMiddleware, adminMiddleware, adminController.getAllContacts);
adminRouter
  .route("/courses")
  .get(authMiddleware, adminMiddleware, adminController.getAllCourses);
adminRouter
  .route("/courses/add")
  .post(authMiddleware, adminMiddleware, adminController.addNewCourse);
adminRouter
  .route("/courses/update/:id")
  .patch(authMiddleware, adminMiddleware, adminController.updateCourse);
adminRouter
  .route("/courses/getcourse/:id")
  .get(authMiddleware, adminMiddleware, adminController.getOneCourse);
adminRouter
  .route("/courses/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteCourse);
adminRouter
  .route("/contacts/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteContact);
adminRouter
  .route("/users/:id")
  .get(authMiddleware, adminMiddleware, adminController.findOneUser);
adminRouter
  .route("/users/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteUser);
adminRouter
  .route("/users/update/:id")
  .patch(authMiddleware, adminMiddleware, adminController.updateOneUser);
adminRouter
  .route("/courses/fetch-youtube")
  .post(authMiddleware, adminMiddleware, adminController.fetchYoutubeCourseData);  
export default adminRouter;
