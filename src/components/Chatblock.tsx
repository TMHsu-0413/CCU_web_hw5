import React, { memo, createElement, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../context/SocketContext";
import { BsCardImage, BsFillEmojiSmileFill } from 'react-icons/bs'

const Chatblock = memo(() => {
  const textRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);
  const { id } = useParams()
  const { socket } = useSocket()
  const displayOwnMessage = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      const message: (string | undefined) = textRef.current?.value
      const div: any = document.createElement("div")
      div.className = "bg-green-200 self-end rounded p-3 my-2 mr-6 break-words text-left";
      div.style = "max-width:80%;";
      for (var i = 0; i < message.length; i++) {
        if ((i + 6) < message.length && message[i] === '[' && message.substring(i + 1, i + 6) === "emoji") {
          i++;
          var emoji_name = ""
          while (message[i] !== ']') {
            emoji_name += message[i]
            i++;
          }
          var img = document.createElement('img')
          img.className = "w-6 inline-block"
          img.src = process.env.REACT_APP_BACK + '/' + emoji_name + '.png'
          div.append(img)
        }
        else
          div.append(message[i]);
      }
      let el: (HTMLElement | undefined) = document.getElementById("Content")!
      el.append(div)
      el.scrollTop = el.scrollHeight
      socket.emit('send-message', message, sessionStorage.getItem('name'), sessionStorage.getItem('id'), id)
      if (textRef.current !== null)
        textRef.current.value = " ";
    }
  }

  const displayOwnImage = (image: string) => {
    const imgDiv: any = document.createElement("img")
    imgDiv.className = "self-end my-2 mr-6 max-w-md object-contain";
    imgDiv.src = image
    let el: (HTMLElement | undefined) = document.getElementById("Content")!
    el.append(imgDiv)
    el.scrollTop = el.scrollHeight
  }
  useEffect(() => {
    const displayOthersMessage = (message: string, name: string) => {
      const nameDiv: any = document.createElement("div")
      const messageDiv: any = document.createElement("div")
      nameDiv.className = "text-white text-base text-left ml-2"
      nameDiv.textContent = name
      messageDiv.className = "bg-white self-start rounded p-3 my-2 ml-6 break-words text-left";
      messageDiv.style = "max-width:80%;";
      for (var i = 0; i < message.length; i++) {
        if ((i + 6) < message.length && message[i] === '[' && message.substring(i + 1, i + 6) === "emoji") {
          i++;
          var emoji_name = ""
          while (message[i] !== ']') {
            emoji_name += message[i]
            i++;
          }
          var img = document.createElement('img')
          img.className = "w-6 inline-block"
          img.src = process.env.REACT_APP_BACK + '/' + emoji_name + '.png'
          messageDiv.append(img)
        }
        else
          messageDiv.append(message[i]);
      }
      let el: (HTMLElement | undefined) = document.getElementById("Content")!
      el.append(nameDiv)
      el.append(messageDiv)
      el.scrollTop = el.scrollHeight
    }

    const displayOthersImage = (image: string, name: string) => {
      const nameDiv: any = document.createElement("div")
      const imgDiv: any = document.createElement("img")
      nameDiv.className = "text-white text-base text-left ml-2"
      nameDiv.textContent = name
      imgDiv.className = "self-start my-2 ml-6 max-w-md object-contain";
      imgDiv.src = image
      let el: (HTMLElement | undefined) = document.getElementById("Content")!
      el.append(nameDiv)
      el.append(imgDiv)
      el.scrollTop = el.scrollHeight
    }

    const NotifyMessage = (name: string, message: string) => {
      const div: any = document.createElement("div")
      div.className = "self-center rounded bg-gray-500 my-2 p-1 break-words"
      div.style = "max-width:80%;";
      div.textContent = name + " has " + message + " the Chatroom."
      let el: (HTMLElement | undefined) = document.getElementById("Content")!
      el.append(div)
      el.scrollTop = el.scrollHeight
    }

    socket.on('receive-message', (message, sendername, senderid, state) => {
      if ((state === 'Multiplayer') || (id === senderid))
        displayOthersMessage(message, sendername)
    })

    socket.on('receive-image', (image, sendername, senderid, state) => {
      if ((state === 'Multiplayer') || (id === senderid))
        displayOthersImage(image, sendername)
    })

    socket.on('join-chat', (sendername, senderid, state) => {
      if ((state === 'Multiplayer') || (id === senderid))
        NotifyMessage(sendername, "join")
    })

    socket.on('leave-chat', (sendername, senderid, state) => {
      if ((state === 'Multiplayer') || (id === senderid))
        NotifyMessage(sendername, "leave")
    })

    const content: (HTMLElement | null) = document.getElementById('Content')!
    const myname = sessionStorage.getItem('name')!, myid = sessionStorage.getItem('id')!
    content.innerHTML = ""
    NotifyMessage(myname, "join")
    socket.emit('join-chat', myname, myid, id)


    // send image on chat
    const image = document.getElementById('image')!
    const getfile = (e: any) => {
      const file = e.target.files[0]
      if (!file)
        return;
      fileReader.readAsDataURL(file)
    }
    var fileReader = new FileReader()

    const transformImage = () => {
      const dataURL = fileReader.result
      socket.emit('send-image', dataURL, myname, myid, id)
      displayOwnImage(dataURL as string)
    }

    image.addEventListener("change", getfile)
    fileReader.addEventListener("load", transformImage)

    return (() => {
      socket.emit('leave-chat', myname, myid, id)
      socket.removeAllListeners()
      image.removeEventListener("change", getfile)
      fileReader.removeEventListener("load", transformImage)
    })
  }, [id])

  // get emoji list
  useEffect(() => {
    const handleEmoji = (name: any) => {
      textRef.current.value += "[" + name.split('.')[0] + "] "
    }

    fetch(process.env.REACT_APP_BACK + '/emoji', { method: "GET" }).then((res: any) => {
      return res.json()
    }).then((emoji) => {
      const emojiList = emojiRef.current

      emoji.file.map((name: string) => {
        // 創建一個按鈕包著emoji，並且按了後要顯示emoji的名稱
        const button = document.createElement('button')
        button.onclick = () => {
          handleEmoji(name)
        }
        const img = document.createElement('img')
        img.src = process.env.REACT_APP_BACK + '/' + name;
        img.className = "w-6"
        button.append(img)
        emojiList.appendChild(button)
      })
    })
  }, [])
  return (
    <div className="flex flex-col w-full">
      <div id="Content" className="w-full bg-gray-600 overflow-scroll flex flex-col flex-1"></div>
      <hr />
      <div id="Input" className="w-full p-2 bg-gray-600 flex flex-col">
        <input type="text" ref={textRef} onKeyDown={(e) => displayOwnMessage(e)} className="w-full h-10 bg-gray-600 outline-none text-white :border-none" placeholder="輸入訊息" />
        <div id="Function" className="flex justify-start gap-2">
          <div className="group relative">
            <button className="border-1 inline-block px-3 py-6 cursor-pointer group-hover:text-white"><BsFillEmojiSmileFill /></button>
            <div ref={emojiRef} id="emoji_items" className="hidden w-64 flex-wrap group-hover:bottom-0 p-3 gap-2 group-hover:left-0 group-hover:flex absolute bg-white">
            </div>
          </div>
          <label className="border-1 inline-block px-3 py-6 cursor-pointer hover:text-white"><BsCardImage /><input className="hidden" type="file" id="image" ref={imageRef} /></label>
        </div>
      </div>
    </div>
  )
})

export default Chatblock;
