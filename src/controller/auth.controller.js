const bcrypt = require("bcryptjs");
const User = require("../models/auth.model");
const { generateToken } = require("../utils/generateToken");

// create account controller
exports.signUp = async (req, res, next) => {
  const { name, phone, password } = req.body;

  try {
    // Check if the user with the provided phone number already exists
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      throw new Error("User with this phone number already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new User instance with the provided data
    const newUser = new User({
      name,
      phone,
      password: hashedPassword,
    });

    // Save the user to the database
    const signUpUser = await newUser.save();

    // console.log("User saved to database:", signUpUser);
    return signUpUser;
  } catch (error) {
    console.error("Error creating user:", error.message);
    throw new Error(`Error creating user: ${error.message}`);
  }
};

// sign in controller
exports.signIn = async (req, res, next) => {
  const { phone, password } = req.body;

  try {
    const user = await User.findOne({ phone });

    if (user || (await user.matchPassword(password))) {
      // Assuming generateToken and res.json are properly defined
      generateToken(res, user._id);
      res.json({
        _id: user._id,
        name: user.name,
        phone: user.phone,
        profilePicture: user.profilePicture,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(401).json({ error: "Invalid phone or password" });
    }
  } catch (error) {
    next(error);
  }
};

// sign-out controller
exports.signOut = (req, res, next) => {
  res.clearCookie("access_token").status(200).json("sign-out successfully!");
};

// get user controller
exports.getUser = async (req, res, next) => {
  const users = await User.find();
  res.json(users);
};

// get user by id controller
exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
};

// update user controller
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;

    await user.save();

    res.json({ message: "User updated Successfully" });
  } else {
    res.status(404);
    throw new Error("USer Not Found");
  }
});

// get user by id controller
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

// delete user by id controller
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await User.deleteOne({ _id: req.params.id });
    res.status(204).json({ message: "User Deleted Successfully" });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});
