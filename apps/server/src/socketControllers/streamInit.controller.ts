import { Socket } from "socket.io"
import { customAlphabet  } from "nanoid"
import NodeMediaServer from 'node-media-server'
import { nmsConfig } from "../config/nms.config"
import { nanoidCustom } from "../utils/constant"

export const streamInit = (socket: Socket) => {
  socket.on("get_source_params", (arg, callback) => {
    //find server params
    //const nms = new NodeMediaServer(nmsConfig)
    //nms.run()
    const nanoid = customAlphabet(nanoidCustom.alph, nanoidCustom.size)
    const key = nanoid()
    const server = `rtmp://${process.env.NMS_RMTP_HOST}/live`
    callback({key, server})
  })
}
