const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");

const cookieparser = require("cookie-parser");
const { AuthenticationUsingCookie } = require("./middlewares/auth");
const app = express();
const PORT = 8000;

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/blogsite")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve("./public")));
app.use(cookieparser());
app.use(AuthenticationUsingCookie("cookie"));


// set View Engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  const err = null;
  console.log("user object from middleware:", req.user);
  res.render("home", { err, user: req.user, blogs: allBlogs });
});

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => console.log(`server started at port ${PORT}`));
