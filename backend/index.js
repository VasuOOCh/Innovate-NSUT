import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";
import {connectDB} from "./lib/connectDb.js";

// Import the routers :
import authRouter from "./routers/authRoute.js"
import messageRouter from "./routers/messageRoute.js"
import lafRouter from "./routers/lafRouter.js"
import userRoute from "./routers/userRoute.js"

import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.use('/api/auth', authRouter);
app.use('/api/laf', lafRouter)
app.use('/api/message', messageRouter);
app.use('/api/users', userRoute)

app.use((err,req,res,next) => {
  console.log( "Error is : ", err);
  const status = err.status || 500;
  const message = err.message || "Something went wrong..."

  res.status(status).json({
    status,
    message,
    error : true
  })
})

server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});