import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // Vite frontend
    credentials: true, // Allow cookies/authorization headers
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

import userRoute from "./src/routes/user.route.js";
import task from "./src/routes/task.route.js";

app.use("/api/v1/users", userRoute);
app.use("/api/v1/task", task);

app.use((err, req, res, next) => {
  // Log the error for debugging purposes
  console.error(err.stack);

  // Send a structured JSON response
  res.status(err.statusCode || 500).json({
    success: err.success,
    statusCode: err.statusCode || 500,
    message: err.message,
    errors: err.errors || [],
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

export { app };
