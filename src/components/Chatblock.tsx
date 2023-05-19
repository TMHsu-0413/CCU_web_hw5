import { listeners } from "process";
import React, { useEffect, useRef } from "react";
import { useSocket } from "../context/SocketContext";

const Chatblock = () => {
  const textRef = useRef<HTMLInputElement>(null);
  const {socket} = useSocket()
  const displayOwnMessage = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      const message: (string | undefined) = textRef.current?.value
      const div: any = document.createElement("div")
      div.className = "w-1/3 bg-green-50 self-end mr-2 p-3 mt-2";
      div.textContent = message
      document.getElementById("Content")?.append(div)
      socket.emit('send-message',message)
      if (textRef.current !== null)
        textRef.current.value = " ";
    }
  }
  useEffect(() => {
    const displayOthersMessage = (message:string) => {
        const div: any = document.createElement("div")
        div.textContent = message
        document.getElementById("Content")?.append(div)
    }
    socket.on('receive-message',message => {
      displayOthersMessage(message)
    })
  },[])

  return (
    <div className="flex flex-col w-2/5 h-4/6 mx-auto">
      <div id="Content" className="w-full flex-1 bg-gray-600 overflow-scroll flex flex-col"></div>
      <hr />
      <div id="Input" className="w-full p-2 bg-gray-600 flex flex-col justify-end">
        <input type="text" ref={textRef} onKeyDown={(e) => displayOwnMessage(e)} className="w-full h-10 bg-gray-600 outline-none text-white :border-none" placeholder="輸入訊息" />
        <div id="Function" className="flex justify-start gap-2">
          <button>Emoji</button>
          <button>Image</button>
        </div>
      </div>
    </div>
  )
}

export default Chatblock;
