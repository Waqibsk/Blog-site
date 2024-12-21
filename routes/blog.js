const User = require("../models/user");
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const { Router } = require("express");
const multer = require("multer");
const router = Router();
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join("./public/uploads/"));
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });
router.get("/add", (req, res) => {
  const err = null;
  return res.render("addblog", {
    err,
    user: req.user,
  });
});
router.post("/add", upload.single("coverimage"), async (req, res) => {
  const { title, content } = req.body;

  // Validation checks
  if (!title || !content || !req.file) {
    return res.render("addblog", {
      err: "All fields are required.",
      user: req.user,
    });
  }

  try {
    const blog = await Blog.create({
      title,
      body: content,
      imageurl: `/uploads/${req.file.filename}`,
    });
    return res.redirect(`/blog/${blog._id}`);
  } catch (error) {
    console.error("Error creating blog:", error);
    return res.render("addblog", {
      err: "an error occurred while adding the blog. Please try again.",
      user: req.user,
    });
  }
});

router.post("/:blogid", async (req, res) => {
  const comment = await Comment.create({
    content: req.body.content,
    blogid: req.params.blogid,
    createdby: req.user._id,
  });
  console.log("commment created IS :", comment);
  res.redirect(`/blog/${req.params.blogid}`);
});
router.get("/:id", async (req, res) => {
  const err = null;
  const blog = await Blog.findById(req.params.id);
  const comments = await Comment.find({ blogid: req.params.id }).populate(
    "createdby"
  );

  console.log("comments", comments);
  console.log("req.user:", req.user);

  res.render("blog", {
    err,
    user: req.user,
    blog,
    comments,
  });
});
router.post("/delete/:blogid", async (req, res) => {
  const id = req.params.blogid;

  try {
    await Blog.findByIdAndDelete(id);
    console.log("Blog deleted!");
    res.redirect("/");
  } catch (err) {
    console.error("Error deleting the blog:", err);
    res.status(500).send("An error occurred while deleting the blog.");
  }
});

module.exports = router;
