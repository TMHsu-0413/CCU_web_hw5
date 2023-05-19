import React, { useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useSocket } from "../context/SocketContext";

const Index = () => {
  const navigate = useNavigate();
  const { socket } = useSocket()
  const inputRef = useRef<HTMLInputElement>(null);
  socket.on("connect", () => {
    console.log(`You connected with id: ${socket.id}`)
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputRef.current !== null) {
      localStorage.setItem('userName', inputRef.current.value)
    }
    navigate("/hw5/Chat")
  }
  return (
    <form className="bg-red-100 w-screen h-screen flex justify-center items-center" onSubmit={(e) => handleSubmit(e)}>
      <div className="bg-white rounded-lg w-1/3 h-2/5 flex flex-col justify-evenly items-center">
        <h2 className="text-4xl mb-2">Chatroom</h2>
        <h2 className="text-2xl">Please enter a nickname</h2>
        <input type="text" ref={inputRef} className="border-1 rounded-3xl w-3/5 text-2xl px-5 py-2 bg-blue-100" placeholder="Nickname" />
        <input type="submit" className="rounded-3xl w-3/5 text-2xl px-5 py-2 bg-gray-300 cursor-pointer" value="Start" />
      </div>
    </form>
  )
}

export default Index;
