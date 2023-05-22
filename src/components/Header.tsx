import React from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketContext";

const Header = () => {
  const navigate = useNavigate();
  const {socket} = useSocket()
  const handleOne = () => {
    socket.emit('leave-multiplayer-chat',"Multiplayer")
    navigate("/hw5/One")
  }

  const handleMulti = () => {
    socket.emit('join-multiplayer-chat',"Multiplayer")
    navigate("/hw5/Multi")
  }
  return (
    <div className="flex gap-4 p-4 border-b bg-gray-600 text-white">
      <button onClick={handleOne}>One to One Chatroom</button>
      <button onClick={handleMulti}>Multiplayer Chatroom</button>
    </div>
  )
}

export default Header;
