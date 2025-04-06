import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";
import { connectDB } from "./lib/connectDb.js";

// Import the routers :
import authRouter from "./routers/authRoute.js"
import lafRouter from "./routers/lafRouter.js"
import userRoute from "./routers/userRoute.js"
import messageRouter from './routers/messageRouter.js'
import chatRouter from './routers/chatRouter.js'
import WebSocket, { WebSocketServer } from 'ws';
import jwt from 'jsonwebtoken'

import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
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
app.use('/api/users', userRoute);
app.use('/api/chats', chatRouter);
app.use('/api/messages', messageRouter);


app.use((err, req, res, next) => {
  console.log("Error is : ", err);
  const status = err.status || 500;
  const message = err.message || "Something went wrong..."

  res.status(status).json({
    status,
    message,
    error: true
  })
})

const server = server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});

const wss = new WebSocketServer({ server });

wss.on('connection', (connection, request) => { //When client will make connection to the server
    try {

        let cookies = request.headers.cookie;
        // console.log(cookies);
        if (cookies) {
            const tokenCookieString1 = cookies.split(';').find((str) => str.startsWith(' token='))
            const tokenCookieString2 = cookies.split(';').find((str) => str.startsWith('token='))
            // console.log(tokenCookieString);
            if (tokenCookieString1 || tokenCookieString2) {
                if (tokenCookieString1) {
                    const token = tokenCookieString1.split('=')[1]
                    jwt.verify(token, process.env.JWT_SECRET, {}, (err, userData) => {
                        if (err) throw err;
                        // console.log(userData);
                        connection.userId = userData.userId;
                    })
                } else {
                    const token = tokenCookieString2.split('=')[1]
                    jwt.verify(token, process.env.JWT_SECRET, {}, (err, userData) => {
                        if (err) throw err;
                        // console.log(userData);
                        connection.userId = userData.userId;
                    })
                }


            }
        };

        connection.on('message', ((data) => {
          console.log("hehe", data);
          
            let message= (JSON.parse(data));
            // console.log("New message recieved :  ", message);
            [...wss.clients]
                .filter(c => c.userId == message.reciever)
                .forEach(c => c.send(JSON.stringify(message)))
        })
        )

    } catch (error) {
        console.log(error);
    }

})