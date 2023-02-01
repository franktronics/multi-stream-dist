export const nmsConfig = {
  rtmp: {
    port: parseInt(process.env.NMS_RMTP_PORT || "3001"),
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: parseInt(process.env.NMS_HTTP_PORT || "3002"),
    allow_origin: '*',
    mediaroot: ''
  }
}
