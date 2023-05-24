import React from "react";
import Chatblock from "../components/Chatblock";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useSocket } from "../context/SocketContext";
import { useUser } from "../context/UserContext";

const One2one = () => {
  const { socket } = useSocket()
  const { setUsers }: any = useUser()
  socket.emit('get-current-users', async (user: any) => {
    setUsers(user)
  })
  return (
    <div className="flex flex-col h-full">
      <Header Chat="One" />
      <div className="flex flex-grow overflow-hidden">
        <Sidebar />
        <Chatblock />
      </div>
    </div>
  )
}

export default One2one;
