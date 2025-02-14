const Review = require("../model/review.model");
//post
const postreview = async (req, res) => {
  const { username, title, description, rating } = req.body;

if (!username || !title || !description || !rating) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await Review.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists. Only one review per user is allowed." });
    }

    const newReview = new Review({ username, title, description, rating });

    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }


};

const getReview = async (req, res) => {
  try {
    const reviews = await Review.find();
res.status(200).json({message: "All reviews get successfully",reviews});
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};



module.exports = {
getReview,postreview
};
