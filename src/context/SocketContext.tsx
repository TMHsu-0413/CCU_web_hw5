import React, { createContext, useContext, useState, useMemo, useCallback } from "react";
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

interface SocketContextData {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>,
  setSocket : any,
  myPeer: any,
  setPeer: any
}
const SocketContext = createContext<SocketContextData | undefined>(undefined)

interface SocketProviderProps {
  children: React.ReactNode
}
export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket,setSocket] = useState()
  const [myPeer,setPeer] = useState()
  // 連接視訊的peer
  const value: any = {
    socket,
    setSocket,
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
