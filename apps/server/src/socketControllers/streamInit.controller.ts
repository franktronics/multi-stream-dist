import { Socket } from "socket.io"
import { customAlphabet  } from "nanoid"
import NodeMediaServer from 'node-media-server'
import { nmsConfig } from "../config/nms.config"
import { nanoidCustom } from "../utils/constant"

export const streamInit = (socket: Socket) => {
  const streamStart = (id) => {
    socket.emit("nms_stream_start", id)
  }
  socket.on("get_source_params", (arg, callback) => {
    //find server params
    const nms = new NodeMediaServer(nmsConfig)
    nms.run()
    nms.on("postPublish", streamStart)
    nms.on('doneConnect', (id, args) => {
      nms.stop()
    })
    const nanoid = customAlphabet(nanoidCustom.alph, nanoidCustom.size)
    const key = nanoid()
    const rtmp = `rtmp://${process.env.NMS_RMTP_HOST}:${process.env.NMS_RMTP_PORT}/live`
    const http = `http://${process.env.NMS_RMTP_HOST}:${process.env.NMS_HTTP_PORT}/live/${key}.flv`
    callback({key, rtmp, http})
  })
}
