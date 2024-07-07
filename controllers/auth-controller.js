const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

//Home Logic

const home = async (req, res) => {
  try {
    res.status(200).send("Express server is running");
  } catch (error) {
    console.log(error);
  }
};

// Registration Logic

const register = async (req, res) => {
  try {
    const { firstname, lastname, email, phone, password, confirmPassword } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ msg: "Email already exists!" });
    }

if(password !== confirmPassword){
  return res.status(400).json({
    msg: "Password confirmation doesn't match!"
  })
}

    const userCreated = await User.create({ firstname, lastname , email, phone, password, confirmPassword });

    res.status(201).json({
      msg: "Registration Successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    res.status(500).json("internal server error");
  }
};

// Login

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    console.log(userExist);

    if (!userExist) {
      return res.status(400).json({
        message: "User doesn't exist",
      });
    }

    const user = await bcrypt.compare(password, userExist.password); //isPasswordValid

    if (user) {
      res.status(200).json({
        success: true,
        user: User,
        msg: "Login Successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({
        sucess: false,
        msg: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};

module.exports = { home, register, login };
