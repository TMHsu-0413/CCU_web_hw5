import React, { createContext, useContext } from "react";
import { Socket } from "socket.io";
import { io } from 'socket.io-client';
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import {Peer} from 'peerjs'

interface SocketContextData {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>
  myPeer: any
}
const SocketContext = createContext<SocketContextData | undefined>(undefined)

interface SocketProviderProps {
  children: React.ReactNode
}
export const SocketProvider = ({ children }: SocketProviderProps) => {
  const socket = io("http://localhost:4000")
  // 連接視訊的peer
  const myPeer = new Peer({
    host: 'localhost',
    port: 3001
  })

  const value: any = {
    socket,
    myPeer,
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
