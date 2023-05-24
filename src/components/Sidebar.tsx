import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Sidebar = () => {
  const navigate = useNavigate()
  const { users }: any = useUser()

  const handleChat = (id: number) => {
    navigate("/hw5/One/" + id)
  }
  return (
    <div className="w-1/4 flex flex-col overflow-scroll border-r bg-gray-600 text-white">
      {users.filter((user: any) => user.id !== sessionStorage.getItem('id')).map((user: any) => {
        return (
          <button className="hover:bg-gray-400 p-4" onClick={() => handleChat(user.id)}>{user.name}</button>
        )
      })}
    </div>
  )
}

export default Sidebar
