import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector } from 'react-redux';
// import Send from "@mui/icons-material/Send";
import React from "react";

// Types
interface User {
  _id: string;
  username: string;
  avatar: string;
}

interface Message {
  _id?: string;
  sender: string;
  reciever: string;
  text: string;
  createdAt?: string;
}

interface RootState {
  user: {
    currentUser: User;
  };
}

function Chat({
  selectedUser,
  setSelectedUser
}: {
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
}) {

  const [chat, setChat] = useState(true);
  const { currentUser } = useSelector((state: any) => state.user);
  const [myChatPeople, setMyChatPeople] = useState<User[]>([]);
  // const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [message, setMessage] = useState<string>("");
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if (message === "") {
      alert("Enter a message");
      return;
    }

    if (!ws || !selectedUser) return;

    const msg: Message = {
      sender: currentUser._id,
      reciever: selectedUser._id,
      text: message,
    };

    ws.send(JSON.stringify(msg));
    setMessages((prev) => [...prev, msg]);

    axios.post('/messages/', msg)
      .catch((err) => console.log("Error sending message:", err));

    setMessage('');
  };

  const fetchMyPeople = async () => {
    try {
    //   const { data: followingUsers } = await axios.get<User[]>('/users/following?userId=' + currentUser._id);
    //   const { data: followersUsers } = await axios.get<User[]>('/users/followers?userId=' + currentUser._id);

    //   const myPeople = followersUsers.filter(fu =>
    //     followingUsers.some(following => following._id === fu._id)
    //   );
    const res = await axios.get('/users/all');
    console.log(res);

      setMyChatPeople(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyPeople();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      connectWs();
    } else {
      ws?.close();
    }
    setMessages([]);

    if (selectedUser) {
      axios.get<Message[]>('/messages/?userId=' + selectedUser._id)
        .then((resp) => setMessages(resp.data))
        .catch((err) => console.log(err));
    }
  }, [selectedUser]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const connectWs = () => {
    const socket = new WebSocket('ws://localhost:3000');
    setWs(socket);

    socket.addEventListener('open', () => {
      console.log("Connection established");
    });

    socket.addEventListener('message', (resp) => {
      const newMessage: Message = JSON.parse(resp.data);
      setMessages((prev) => [...prev, newMessage]);
    });

    socket.addEventListener('error', (error) => {
      console.log("Error in websocket connection: ", error);
    });

    socket.addEventListener('close', (event) => {
      console.log('WebSocket connection closed:', event.code, event.reason);
    });
  };
  return (
    <div className="h-[500px] flex flex-col relative border">
      <div className="flex-1 flex flex-col gap-5 h-full">
        <div className="flex flex-col gap-2">
          {myChatPeople.map((people) => (
            <div
              key={people._id}
              onClick={() => setSelectedUser(people)}
              className="flex items-center gap-5 bg-white rounded-xl p-2 text-gray-700 cursor-pointer hover:bg-gray-100"
            >
              <img
                src={'https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg'}
                alt={people.username}
                className="h-8 w-8 object-cover rounded-full"
              />
              {people.username}
            </div>
          ))}
        </div>
      </div>
  
      {selectedUser && (
        <div className="absolute top-0 left-0 w-full h-full bg-white flex flex-col gap-2">
          <div className="mt-2 font-bold flex items-center justify-between px-4">
            <div className="flex items-center gap-4 bg-gray-200 px-3 py-1 rounded-full">
              <img
                src={'https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg'}
                alt={selectedUser.username}
                className="w-7 h-7 object-cover rounded-full"
              />
              {selectedUser.username}
            </div>
            <span
              onClick={() => setSelectedUser(null)}
              className="cursor-pointer bg-black text-white px-2 py-1 rounded-full hover:scale-105 transition-transform"
            >
              X
            </span>
          </div>
  
          <div
            className="h-[350px] overflow-y-scroll p-5 flex flex-col gap-5 flex-1"
            ref={chatRef}
          >
            {messages.map((message, idx) => {
              const isSender = message.sender === currentUser._id;
              return (
                <div
                  key={message._id || idx}
                  className={`max-w-fit p-3 flex flex-col gap-1 text-justify ${
                    isSender
                      ? "ml-auto bg-blue-600 text-white rounded-tl-2xl rounded-br-xl"
                      : "bg-gray-200 text-black rounded-tr-2xl rounded-bl-xl"
                  } group`}
                >
                  <div>{message.text}</div>
                  {message.createdAt && (
                    <div
                      className={`text-xs gap-2 ${
                        isSender ? "text-gray-200" : "text-gray-600"
                      } hidden group-hover:flex`}
                    >
                      <span>{message.createdAt.slice(0, 10)}</span>
                      <span>{message.createdAt.slice(11, 19)}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
  
          <div className="border border-gray-400 rounded-xl overflow-hidden h-[60px] flex items-center justify-between px-2">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 h-full border-none p-4 focus:outline-none resize-none"
            />
            <button
              onClick={sendMessage}
              className="w-16 h-full bg-sky-600 text-white hover:bg-yellow-200 active:bg-orange-300 transition-colors flex items-center justify-center"
            >
              Send
              {/* <Send /> */}
            </button>
          </div>
        </div>
      )}
    </div>
  );
  
}

export default Chat;
