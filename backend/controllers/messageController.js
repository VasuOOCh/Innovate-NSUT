import asyncHandler from "../lib/asynchandler.js";
import User from "../models/User.js";
import Message from "../models/Message.js";
import { getReceiverSocketId } from "../lib/socket.js";

// // this gets all users except the user logged in
// const getUsers = asyncHandler(async (req, res, next) => {
//   try {
//     const loogedInUser = req.user._id; // one who found the item
//     const owner = await User.findOne({ _id:  });
//     res.status(200).json({ users });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

const getMessages = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params; // one who is owner
    const myId = req.user.userId ; // one who found the item
    console.log("ids",id , myId);

    const message = await Message.find({
      $or: [
        { senderId: id, receiverId: myId },
        { senderId: myId, receiverId: id },
      ],
    });

    res.status(200).json({ message });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

const sendMessage = asyncHandler(async (req, res, next) => {
  try {
    const { text, image } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user.userId;

    // process the image later

    const newMessage = new Message({
      receiverId,
      senderId,
      text,
    });

    await newMessage.save();
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    // else case can be used to show whether message is seen or delivered

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

export { getMessages, sendMessage };