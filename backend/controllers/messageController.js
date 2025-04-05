import asyncHandler from "../lib/asynchandler.js";
import User from "../models/User.js";
import Message from "../models/Message.js";
import { getReceiverSocketId } from "../lib/socket.js";

// this gets all users with whom user has chat already except the user logged in
const getUsers = asyncHandler(async (req, res, next) => {
  try {
    const loggedInUserId = req.user.userId;

    // Step 1: Get all messages where user is involved
    const messages = await Message.find({
      $or: [
        { senderId: loggedInUserId },
        { receiverId: loggedInUserId }
      ]
    }).select('senderId receiverId');

    // Step 2: Extract unique participant user IDs
    const participantIds = new Set();
    messages.forEach(msg => {
      if (msg.senderId.toString() !== loggedInUserId.toString()) {
        participantIds.add(msg.senderId.toString());
      }
      if (msg.receiverId.toString() !== loggedInUserId.toString()) {
        participantIds.add(msg.receiverId.toString());
      }
    });

    // Step 3: Query users based on participantIds
    const users = await User.find({
      _id: { $in: Array.from(participantIds) }
    }).select('-password'); // Exclude sensitive fields if needed

    res.status(200).json({ users });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


const getMessages = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params; // one who is owner
    const myId = req.user.userId; // one who found the item
    console.log("ids", id, myId);

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

export {getUsers, getMessages, sendMessage };
