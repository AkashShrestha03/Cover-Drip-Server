const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  confirmPassword: {
    type: String,
    require: true,
  },
});

userSchema.pre("save", async function(next){
  const user = this;

  if(!user.isModified("password")){
    next()
  }

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = bcrypt.hash(user.password, saltRound);
    user.password = hash_password
  } catch (error) {
    next(error)
  }
})


//json web token

userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      { userId: this._id.toString(), email: this.email, isAdmin: this.isAdmin },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "6d",
      }
    );
  } catch (error) {
    console.error(error);
  }
}

const User = new mongoose.model("User", userSchema);

module.exports = User;