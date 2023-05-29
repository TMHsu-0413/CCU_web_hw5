import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BsCameraVideoFill, BsCameraVideoOffFill, BsMicFill, BsMicMuteFill } from 'react-icons/bs'
import { useSocket } from "../context/SocketContext";

const Header = (props: any) => {
  const { Chat } = props
  const navigate = useNavigate();
  const { socket, myPeer } = useSocket()
  const { id } = useParams()
  const [stream, setStream] = useState(undefined)
  const [video, setVideo] = useState<boolean>(true)
  const [audio, setAudio] = useState<boolean>(true)
  const localVideoRef = useRef<any>(null)
  const remoteVideoRef = useRef<any>(null)

  useEffect(() => {
    return () => {
      if (stream !== undefined) {
        stream.getTracks().forEach((track: any) => {
          track.stop()
        })
        setStream(undefined)
      }
    }
  }, [id,stream,myPeer])

  const addVideoStream = useCallback((video: any, curstream: any) => {
    if(video.paused){
      video.srcObject = curstream
      video.play()
    }
  },[])

  const openWebRTC = async () => {
    const temp_stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    })

    addVideoStream(localVideoRef.current, temp_stream)

    myPeer.on('call', (call:any) => {
      call.answer(temp_stream)

      call.on('stream',(userVideoStream:any) => {
        addVideoStream(remoteVideoRef.current,userVideoStream)
      })
    })

    const call = myPeer.call(id,temp_stream)

    call.on('stream',(userVideoStream:any) => {
      addVideoStream(remoteVideoRef.current,userVideoStream)
    })
    
    call.on('close', () => {
      remoteVideoRef.current.close()
    })
    
    setStream(temp_stream)
  }

  const closeCameraOnly = () => {
    stream.getVideoTracks()[0].enabled = false
    setVideo(false)
  }

  const openCameraOnly = () => {
    stream.getVideoTracks()[0].enabled = true
    setVideo(true)
  }

  const closeAudioOnly = () => {
    stream.getAudioTracks()[0].enabled = false
    setAudio(false)
  }

  const openAudioOnly = () => {
    stream.getAudioTracks()[0].enabled = true
    setAudio(true)
  }

  const handleOne = () => {
    socket.emit('leave-multiplayer-chat', "Multiplayer")
    navigate("/hw5/One")
  }

  const handleMulti = () => {
    socket.emit('join-multiplayer-chat', "Multiplayer")
    navigate("/hw5/Multi")
  }
  return (
    <div className="flex gap-4 p-4 border-b bg-gray-600 text-white">
      <button onClick={handleOne}>One to One Chatroom</button>
      <button onClick={handleMulti}>Multiplayer Chatroom</button>
      {Chat === 'One' && stream === undefined && <button onClick={openWebRTC}>開啟視訊通話</button>}
      {Chat === 'One' && stream !== undefined && video === false && <button onClick={openCameraOnly}><BsCameraVideoOffFill /></button>}
      {Chat === 'One' && stream !== undefined && video === true && <button onClick={closeCameraOnly}><BsCameraVideoFill /></button>}
      {Chat === 'One' && stream !== undefined && audio === false && <button onClick={openAudioOnly}><BsMicMuteFill /></button>}
      {Chat === 'One' && stream !== undefined && audio === true && <button onClick={closeAudioOnly}><BsMicFill /></button>}
      <div id="video-grid" className="flex ml-auto gap-2">
        <video ref={localVideoRef} className="w-52" muted/>
        <video ref={remoteVideoRef} className="w-52" id="remote" />
      </div>
    </div>
  )
}

export default Header;
