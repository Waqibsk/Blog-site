const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const Bcrypt = require("bcryptjs");


const UserSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // ensure email uniqueness
    },
    password: {
      type: String,
      required: true,
    },
    
  },
  { timestamps: true } 
);

// Pre-save hook to hash password
UserSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  user.password = Bcrypt.hashSync(user.password, 10);
  next();
});
UserSchema.methods.comparePassword = function(plaintext, callback) {
  return callback(null, Bcrypt.compareSync(plaintext, this.password));
};


const User = model("user", UserSchema);

module.exports = User;
