import { Socket } from "socket.io"
import NodeMediaServer from 'node-media-server'
import { nmsConfig } from "../config/nms.config"

export const streamInit = (socket: Socket) => {
  socket.on("get_source_params", (arg) => {
    //find server params
    const nms = new NodeMediaServer(nmsConfig)
    nms.run()

  })
}
