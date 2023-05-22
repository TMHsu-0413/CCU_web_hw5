import React from "react";
import Chatblock from "../components/Chatblock";
import Header from "../components/Header";
import { useSocket } from "../context/SocketContext";
import { useUser } from "../context/UserContext";

const Multiplayer = () => {
  const {socket} = useSocket()
  const {setUsers} : any = useUser()
   socket.emit('get-current-users', async (user : any) => {
    setUsers(user)
  })
  return (
    <div className="flex flex-col h-full">
      <Header />
      <div className="flex flex-grow overflow-hidden">
        <Chatblock />
      </div>
    </div>
  )
}

export default Multiplayer;
