import React, { createContext, useContext, useState } from "react";

const UserContext = createContext<object | undefined>(undefined)

interface UserProviderProps {
  children: React.ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [users, setUsers] = useState([])
  const [isMulti, setisMulti] = useState(false)

  const value: object = {
    users,
    setUsers,
    isMulti,
    setisMulti
  }

  return <UserContext.Provider value={value} >{children}</UserContext.Provider>
}

export function useUser() {
  const UserContextData = useContext(UserContext)
  if (UserContextData === undefined) {
    throw new Error("Error")
  }
  return UserContextData;
}
