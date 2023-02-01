import Cookies from "js-cookie";
import { createContext, PropsWithChildren, useCallback, useContext, useState } from "react";
import { defaultUser, UserType } from "../types/user.types";
import { SocketMachine } from "../utils/socket";

type UserContextType = {
  user: UserType,
  token: string,
  userId: number,
  setUser: (data: any) => void,
  socketMachine: SocketMachine | null
}

const contextDefaultValue: UserContextType = {
  user: defaultUser,
  token: Cookies.get('token') || "",
  userId: parseInt(Cookies.get('userId') || "0"),
  setUser: () => {},
  socketMachine: null
}

export const UserContext = createContext<UserContextType>(contextDefaultValue)

export const useUser = () => useContext(UserContext)

export const UserProvider = ({children}: PropsWithChildren) => {
  const [user, setUser] = useState<UserType>(contextDefaultValue.user)
  const [socketMachine, setSocketMachine] = useState<SocketMachine | null>(null)

  const value = {
    user: user,
    setUser: useCallback((data: any) => {
      setUser((u) => {return {...u, ...data}})
      const socketInited = SocketMachine.init({})
      socketInited.connect()
      setSocketMachine(socketInited)
    }, [setUser, setSocketMachine]),
    token: Cookies.get('token') || "",
    userId: parseInt(Cookies.get('userId') || "0"),
    socketMachine: socketMachine
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

/**
 *
 * @param userCont The context of the user
 * @param request The service fonction that make the request
 * @param update if the user is update after the request
 * @returns promise
 */
export const useGetUser = async (userCont: UserContextType, request: any, update: boolean = false) => {
  if(!Cookies.get("token") || !Cookies.get("userId")){
    return {
      status: "error",
      message: "Token introuvable"
    }
  }
  const result = await request({
    endpoint: `user/getuser?id=${userCont.userId}`,
    method: "GET"
  })
  if(result.status === "success"){
    if(update) userCont.setUser(result.data.user)
  }else{
    Cookies.remove("token")
    Cookies.remove("userId")
  }
  return result
}
