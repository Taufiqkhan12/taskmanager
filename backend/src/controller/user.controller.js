import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

const generateAccessToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();

    await user.save({ validateBeforeSave: false });
    return { accessToken };
  } catch (error) {
    throw Error("Something went wrong while generating access token");
  }
};

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      throw Error("All the fields is required");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      throw new Error("User with email already exists");
    }

    const isEmailValid = function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (!isEmailValid(email)) {
      throw new Error("Enter a valid email");
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    const newUser = await User.findById(user._id).select("-password ");

    console.log(newUser);

    if (!newUser) {
      throw Error("Something went wrong signingup user");
    }

    return res.status(200).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw Error("All fields must be filled");
    }

    const userExist = await User.findOne({ email });

    if (!userExist) {
      throw Error("User does not exist");
    }

    const isPasswordValid = await bcrypt.compare(password, userExist.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const { accessToken } = await generateAccessToken(userExist._id);

    const loggedInUser = await User.findById(userExist._id).select(
      "-password "
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res.status(200).cookie("accessToken", accessToken, options).json({
      message: "Logged in Successfully",
      user: loggedInUser,
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res, next) => {
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json("User logged out Successfully");
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select(
      "-password -email -role -createdAt -updatedAt"
    );
    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      throw Error("User id is required");
    }

    const user = await User.findById({ _id: userId });

    if (!user) {
      throw Error("User doesn't exist");
    }

    return res.status(200).json(user);
  } catch (error) {
    next();
  }
};

const checkUserRole = async (req, res, next) => {
  try {
    const role = req.role;

    if (!role) {
      throw Error("Invalid role");
    }

    return res.status(200).json(role);
  } catch (error) {
    next(error);
  }
};

export {
  registerUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getUserById,
  checkUserRole,
};
