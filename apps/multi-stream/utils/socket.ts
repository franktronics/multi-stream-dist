import Cookies from "js-cookie"
import { io, Socket } from "socket.io-client"
import type { SocketInitType } from "./utils.type"

export class SocketMachine {
  private token: string | undefined | null
  private userId: string | undefined | null
  private socketUrl: string | undefined
  public socket: Socket | null

  constructor(props: SocketInitType){
    this.token = props.token || Cookies.get("token")
    this.userId = props.userId || Cookies.get("userId")
    this.socketUrl = process.env.NEXT_PUBLIC_SOCKET
    this.socket = null
  }

  initConnexion(){
    if(!(this.socketUrl && this.token && this.userId)){
      this.disconnectCookies()
      if(this.socket?.connected){
        this.socket?.disconnect()
      }
      return
    }
    this.socket = io(this.socketUrl, {
      auth: {
        token: this.token,
        userId: this.userId
      },
      autoConnect: false
    })
    this.socket.onAny((event, ...args) => {
      console.log("onAny", event, args)
    })
    this.socket.on("disconnect", (...arg) => {
      console.log("socket disconnect", arg)
    })
  }
  connect(){
    if(this.socket?.disconnected){
      this.socket?.connect()
    }
  }
  disconnect(){
    this.socket?.disconnect()
  }
  disconnectCookies(){
    Cookies.remove("token")
    Cookies.remove("userId")
  }

  public static init(props: SocketInitType){
    const machine = new SocketMachine({...props})
    machine.initConnexion()
    return machine
  }
}
