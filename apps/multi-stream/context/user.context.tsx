import Cookies from "js-cookie";
import { createContext, PropsWithChildren, useCallback, useContext, useState } from "react";
import { defaultUser, UserType } from "../types/user.types";

type UserContextType = {
  user: UserType,
  token: string,
  userId: number,
  setUser: (data: any) => void
}

const contextDefaultValue: UserContextType = {
  user: defaultUser,
  token: Cookies.get('token') || "",
  userId: parseInt(Cookies.get('userId')) || 0,
  setUser: () => {},
}

export const UserContext = createContext<UserContextType>(contextDefaultValue)

export const useUser = () => useContext(UserContext)

export const UserProvider = ({children}: PropsWithChildren) => {
  const [user, setUser] = useState<UserType>(contextDefaultValue.user)

  const value = {
    user: user,
    setUser: useCallback((data: any) => {
      setUser((u) => {return {...u, ...data}})
    }, [setUser]),
    token: Cookies.get('token') || "",
    userId: parseInt(Cookies.get('userId')) || 0,
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

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
