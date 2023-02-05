import { Socket } from "socket.io"
import { customAlphabet  } from "nanoid"
import NodeMediaServer from 'node-media-server'
import { nmsConfig } from "../config/nms.config"
import { nanoidCustom } from "../utils/constant"
import { spawn } from "child_process"
import {path} from '@ffmpeg-installer/ffmpeg'
const ffmpegPath = path

const parseLink = (str: string) => {
  if(str.split("").at(-1) === "/") return str
  else return `${str}/`
}

const connectReceiver = (source, receivers) => {
  const normSource = parseLink(source.rtmp) + source.key
  const normReceiver = receivers.map((rec) => {
    return `[f=flv]${parseLink(rec.server)}${rec.key}`
  }).join("|")
  console.log("connection", normSource, normReceiver)
  const argument = [
    '-i',
    normSource,
    '-c:v',
    'copy',
    '-c:a',
    'copy',
    '-map',
    '0',
    '-f',
    'tee',
    normReceiver
  ]
  let proc = spawn(ffmpegPath, argument)
  proc.stdout.on('data', function(data) {
      console.log(data)
  })
  proc.stderr.setEncoding("utf8")
  proc.stderr.on('data', function(data) {
      console.log(data)
  })
  proc.on('close', function() {
      console.log('finished')
  })
}

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
  socket.on("connect_receiver", (arg, callback) => {
    connectReceiver(arg.source, arg.receivers)
  })
}
