import React, { useEffect, useRef } from "react";
import { Peer } from 'peerjs'
import { useNavigate } from 'react-router-dom';
import { useSocket } from "../context/SocketContext";
import { useUser } from "../context/UserContext";
import { io } from "socket.io-client";

const Index = () => {
  const navigate = useNavigate();
  const { socket, setSocket, setmyPeer } = useSocket()
  const { setUsers }: any = useUser()
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_BACK)
    socket.on("connect", () => {
      console.log(`You connected with id: ${socket.id}`)
      sessionStorage.setItem('id', socket.id)
      const newPeer = new Peer(socket.id, {
        host: 'localhost',
        port: 3001
      })
      setSocket(socket)
      setmyPeer(newPeer)
    })
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputRef.current !== null) {
      sessionStorage.setItem('name', inputRef.current.value)
    }
    socket.emit('join-lobby', inputRef.current?.value, sessionStorage.getItem('id'))
    socket.on('join-lobby', (name, id) => {
      setUsers((prev: any) => {
        return (
          [
            ...prev,
            {
              name: name,
              id: id
            }
          ]
        )
      })
    })
    navigate("/hw5/One")
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
