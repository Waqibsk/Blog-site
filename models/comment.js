const mongoose = require("mongoose");
const { SchemaTypes } = require("mongoose");

const { Schema, model } = mongoose;

const CommentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    blogid: {
      type: SchemaTypes.ObjectId,
      ref: "blog",
    },

    createdby: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);
const Comment = model("comment", CommentSchema);
module.exports = Comment;
