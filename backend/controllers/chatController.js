import mongoose from "mongoose";
import Chat from "../models/Chat.js";
import User from "../models/User.js";
import { createError } from "../lib/CustomError.js";
// import { createError } from "../CustomError.js";


export const getChats = async (req, res, next) => {
    try {

        const filter = {};
        if (req.query.userId) filter.users = { $in: [new mongoose.Types.ObjectId(req.query.userId)] }
        // console.log(filter);
        const chats = await Chat.find(filter).populate('users');
        // console.log(chats);
        res.status(200).json(chats)
    } catch (error) {
        next(createError(500, "error in fectching all chats"))
    }
}

export const getChat = async (req, res) => {
    try {
        const chats = await Chat.findById(req.params.id);
        res.status(200).json(chats)
    } catch (error) {
        console.log(error);
        res.status(500).json('error in fectching chat')
    }
}

export const addChat = async (req, res, next) => {
    try {
      const user1 = req.user.userId;
      const user2 = req.body.userId;
  
      // Check if a chat already exists between the two users (order doesn't matter)
      const existingChat = await Chat.findOne({
        users: { $all: [user1, user2], $size: 2 },
      });
  
      if (existingChat) {
        return res.status(200).json("Chat already exists");
      }
  
      // If no chat exists, create a new one
      const newChat = new Chat({
        users: [user1, user2],
      });
  
      await newChat.save();
  
      res.status(200).json("Chat created successfully");
    } catch (error) {
      next(error);
    }
  };
  

// export const addChat = async (req, res) => {
//     try {
//         // console.log(req.body);
// const users = await User.find({
//     _id: { $in: [req.body.userIds[0], req.body.userIds[1]] }
// })

//         let newChat = new Chat({
//             users : [users[0], users[1]]
//         });

//         newChat.save();


//         users.forEach((user) => {
//             user.chats.push(newChat);
//             user.save();
//         })

//         console.log(users);
//         console.log(newChat);
//         res.status(200).json("Chat created")
//     } catch (error) {
//         console.log(error);
//         res.status(500).json('error in adding chat')
//     }
// }

// export const deleteChat = async (req, res) => {
//     try {
//         await Chat.findByIdAndDelete(req.params.id)
//         res.status(200).json("deleted chat")
//     } catch (error) {
//         console.log(error);
//         res.status(500).json('error in deleting chat')
//     }
// }


// export const checkChat = async (req,res) => {
//     try {
//         console.log(req.body);
//         const chat = await Chat.findOne({
//             users: { $all: [new mongoose.Types.ObjectId(req.body.userIds[0]), new mongoose.Types.ObjectId(req.body.userIds[1])]}
//         })
//         console.log(chat);
//         if(chat) return res.status(200).json(true);
//         res.status(200).json(false)
//     } catch (error) {
//         console.log(error);
//         res.status(500).json('error in checking chat')
//     }
// }