import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const checkRole = async (req, _, next) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      throw Error("Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select("-password ");

    if (!user) {
      throw Error("Invalid Access Token");
    }

    req.user = user._id;
    req.role = user.role;
    next();
  } catch (error) {
    next(error);
  }
};

export { checkRole };
