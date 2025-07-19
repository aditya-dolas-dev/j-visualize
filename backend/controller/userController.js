const zod = require("zod");
const { User } = require("../model/users.js");
const { get } = require("mongoose");

const signupSchema = zod.object({
  firstname: zod.string().min(1, "First name is required"),
  lastname: zod.string().min(1, "Last name is required"),
  email: zod.string().email("Invalid email format"),
  password: zod
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(30, "Password too long"),
  username: zod
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username too long")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),
  createdAt: zod.date().optional(),
});

//  signup Controller function
const signup = async (req, res) => {
  const { success } = signupSchema.safeParse(req.body);

  try {
    if (!success) {
      return res.status(400).json({ message: "Invalid Input" });
    }

    const existingUser = await User.findOne({ username: req.body.username });

    const existingEmail = await User.findOne({ email: req.body.email });

    if (existingEmail) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    if (existingUser) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }

    const newUser = await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
    });

    return res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};

const loginSchema = zod.object({
  username: zod.string("Username is required"),
  password: zod.string(),
});

// login Controller function

const login = async (req, res) => {
  const { success } = loginSchema.safeParse(req.body);

  try {
    if (!success) {
      return res.status(400).json({
        message: "Invalid Input",
      });
    }

    const existingUser = await User.findOne({ username: req.body.username });

    if (!existingUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (existingUser.password !== req.body.password) {
      return res.status(401).json({
        messsage: "Incorrect password",
      });
    }

    return res.status(201).json({
      message: "User logged in  successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};

const getProfile = async (req, res) => {
  return res.status(200).json({
    message: "Profile fetched successfully", // Assuming req.user is set after authentication
  });
};

module.exports = {
  signup,
  login,
  getProfile,
};
