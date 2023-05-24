import React, { createContext, useContext, useState, useMemo, useCallback } from "react";
import { Socket } from "socket.io";
import { io } from 'socket.io-client';
import { DefaultEventsMap } from "socket.io/dist/typed-events";

interface SocketContextData {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>,
  setSocket: any,
  myPeer: any,
  setmyPeer: any
}
const SocketContext = createContext<SocketContextData | undefined>(undefined)

interface SocketProviderProps {
  children: React.ReactNode
}
export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket,setSocket] = useState(undefined)
  const [myPeer,setmyPeer] = useState(undefined)
  // 連接視訊的peer
  const value: any = {
    socket,
    setSocket,
    myPeer,
    setmyPeer
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
