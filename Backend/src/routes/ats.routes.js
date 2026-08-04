const express = require("express");
const atsRouter = express.Router();
const atsController = require("../controllers/ats.controller");

atsRouter.post("/analyze", atsController.analyzeATS);

module.exports = atsRouter;