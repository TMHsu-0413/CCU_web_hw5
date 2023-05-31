import React, { createContext, useMemo, useContext, useState } from "react";
import { Socket } from "socket.io";
import { io } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

interface SocketContextData {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>,
  myPeer: any,
  setPeer: any
}
const SocketContext = createContext<SocketContextData | undefined>(undefined)

interface SocketProviderProps {
  children: React.ReactNode
}
export const SocketProvider = ({ children }: SocketProviderProps) => {
  const socket = useMemo(() => {
    return io(process.env.REACT_APP_BACK)
  },[])
  const [myPeer, setPeer] = useState()
  // 連接視訊的peer
  const value: any = {
    socket,
    myPeer,
    setPeer
  }

  return <SocketContext.Provider value={value} >{children}</SocketContext.Provider>
}

export function useSocket() {
  const SocketContextData = useContext(SocketContext)
  if (SocketContextData === undefined) {
    throw new Error("Error")
  }
  return SocketContextData;
}
