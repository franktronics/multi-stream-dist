export const nmsConfig = {
  rtmp: {
    port: process.env.NMS_RMTP_PORT,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  /*http: {
    port: 8000,
    allow_origin: '*'
  }*/
}
