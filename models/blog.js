const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    imageurl: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);
const Blog = model("blog", BlogSchema);

module.exports = Blog;
