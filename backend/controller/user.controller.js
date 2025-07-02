import { User } from "../models/user.modle.js";

const registerUser = async (req, res) => {
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

  if (!isEmailValid) {
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
    throw new ApiError(500, "Something went wrong signingup user");
  }

  return res.status(200).json(newUser);
};

export { registerUser };
