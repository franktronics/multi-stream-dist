import Cookies from "js-cookie";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { defaultUser, UserType } from "../types/user.types";
import { useService } from "../utils/service";

type UserContextType = {
  user: UserType,
  token: string,
  userId: string,
  setUser: (data: any) => void
}

const contextDefaultValue: UserContextType = {
  user: defaultUser,
  token: Cookies.get('token') || "",
  userId: Cookies.get('userId') || "",
  setUser: () => {},
}

export const UserContext = createContext<UserContextType>(contextDefaultValue)

export const useUser = () => useContext(UserContext)

export const UserProvider = ({children}: PropsWithChildren) => {
  const [user, setUser] = useState<UserType>(contextDefaultValue.user)

  const value = {
    user: user,
    setUser: (data: any) => {
      setUser((user) => {return {...user, ...data}})
    },
    token: Cookies.get('token') || "",
    userId: Cookies.get('userId') || "",
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export const useGetUser = async (userCont: UserContextType, request: any) => {
  //const [request] = useService()
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
  console.log("result", result)
  if(result.status === "success"){
    userCont.setUser(result.data.user)
  }else{
    Cookies.remove("token")
    Cookies.remove("userId")
  }
  return result
}
