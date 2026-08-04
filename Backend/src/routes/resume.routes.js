const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const resumeRouter = express.Router();
const resumeController = require("../controllers/resume.controller");

resumeRouter.post("/create", authMiddleware.authUser, resumeController.createResume);

resumeRouter.get("/get", authMiddleware.authUser, resumeController.getAllResumes);

resumeRouter.get("/get/:id", authMiddleware.authUser, resumeController.getResumeById);

resumeRouter.put("/update/:id", authMiddleware.authUser, resumeController.updateResumeById);

resumeRouter.delete("/delete/:id", authMiddleware.authUser, resumeController.deleteResumeById);

module.exports = resumeRouter;