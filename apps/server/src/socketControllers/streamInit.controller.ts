import { Socket } from "socket.io";

export const streamInit = (socket: Socket) => {
  socket.on("get_source_params", (arg) => {
    //find server params
  })
}
