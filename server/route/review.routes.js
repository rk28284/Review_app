const express = require("express");
const { getReview, postreview } = require("../controllers/review.controller");

const reviewRouter = express.Router();

reviewRouter.get("/api/review", getReview);
reviewRouter.post("/api/review", postreview);

module.exports = reviewRouter;
