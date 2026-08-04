const express = require("express")
const coverLetterRouter = express.Router()
const coverLetterController = require("../controllers/coverLetter.controller")
const authMiddleware = require('../middlewares/auth.middleware')

coverLetterRouter.post("/generate",authMiddleware.authUser,coverLetterController.generateCoverLetter);

coverLetterRouter.get("/get",authMiddleware.authUser,coverLetterController.getAllCoverLetters)

coverLetterRouter.get("/get/:id",authMiddleware.authUser,coverLetterController.getCoverLetterById)

coverLetterRouter.delete("/delete/:id",authMiddleware.authUser,coverLetterController.deleteCoverLetterById)

module.exports = coverLetterRouter;