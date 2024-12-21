const User = require("../models/user");
const { Router } = require("express");
const bcrypt = require("bcryptjs");
const { CreateToken } = require("../services/auth");
const router = Router();
router.get("/signin", (req, res) => {
  const err = req.query.err ? "Invalid email or password" : null;
  res.render("signin", { err });
});

router.get("/signup", (req, res) => {
  const err = null;
  res.render("signup", { err });
});

router.post("/signup", async (req, res) => {
  const { fullname, email, password } = req.body;
  if(await User.findOne({ email })){
    return res.render("signup",{
      err:"A user by this email already exist "
      
    })
   }
  await User.create({
    fullname,
    email,
    password,
  });
 
  return res.redirect("/");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  // console.log("stored hashed password:", user.password);
  if (!user) {
    return res.render("signin", { err: "Invalid email or password" });
  }

  const isMatched = await bcrypt.compare(password, user.password);
  console.log("Password match:", isMatched);
  if (!isMatched) {
    return res.redirect("/user/signin?err=1"); // Pass error via query string
  }
  const token = CreateToken(user);

  return res.cookie("cookie", token).redirect("/"); // Redirect to a dashboard or another page
});

router.get("/logout", (req, res) => {
  res.clearCookie("cookie").redirect("/");
});
module.exports = router;
