const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  id: { type: String },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId, //直接把Schema中的ObjectId放進來
    ref: "User", //跟User做聯結
  },
  student: {
    type: [String],
    default: [],
  },
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
