import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { Method } from "./service.type"
import Cookies from 'js-cookie'

type RequestProps = {
  endpoint: string,
  method?: Method,
  data?: any,
  anonymous?: boolean,
  headers?: any
}
type ReturnProps = {
  status: "success" | "error" | "warning",
  data?: any,
  message: string
}

const serverUrl = process.env.NEXT_PUBLIC_SERVER

export const useService = () => {
  const [token, setToken] = useState<string | null>(Cookies.get( 'token' ))
  useEffect(() => {
    setToken(Cookies.get( 'token' ))
  }, [setToken])


  const request = async ({endpoint, method = 'GET', data = null, anonymous = false, headers = {}}: RequestProps): Promise<ReturnProps> => {
    try{
      if(!anonymous && !(token && token !== "")) throw new Error("Aucun token fourni")

      const res = await axios({
        method: method,
        url: `${serverUrl}/${endpoint}`,
        headers: {
            'content-type': 'application/json',
            Authorization: (token && !anonymous)? `Bearer ${token}`: '',
            ...headers
        },
        data: JSON.stringify( data )
      })
      if(res && res.data){
        return {
          status: "success",
          data: res.data,
          message: res.data.message || ""
        }
      }
    }catch(error){
      if(error instanceof AxiosError){
        return {
          status: (error.response?.status === 401)? "warning": "error",
          message: error.code === "ERR_NETWORK"? "Erreur réseau": error.response? error.response.data: error.message
        }
      }else if(error instanceof Error){
        return {
          status: "error",
          message: error.message
        }
      }else{
        return {
          status: "error",
          message: "Une erreur est survenue"
        }
      }
    }
  }
  //type t = typeof request

  return [request]
}
