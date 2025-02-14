const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true }, 
    title: { type: String, required: true },                  
    description: { type: String, required: true },           
    rating: { type: Number, min: 1, max: 5, required: true },
  },
  { timestamps: true } 
);

module.exports = mongoose.model("Review", reviewSchema);
