import express, {Express} from 'express'
import { createServer } from "http"
import chalk from "chalk"
import cors from "cors"
import { verifyToken } from "./middleware/authJwt"
import * as dotenv from 'dotenv'
import userRoutes from "./routes/user.routes"
import { Server } from "socket.io"
import { verifySocketToken } from './middleware/authToken'
import { streamInit } from './socketControllers/streamInit.controller'

dotenv.config()

const port = process.env.API_PORT ? Number(process.env.API_PORT) : 3000
const app: Express = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:4200",
  },
})

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
)
app.get('/', (req, res) => {
  res.send({ message: 'Hello API' })
})

/////////initialisation
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  )
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  )
  next()
})
app.use(express.json())
app.use(verifyToken)
//////////

//////////routes
app.use('/user', userRoutes)
//////////

//////////io
io.use((socket, next) => {
  const token = socket.handshake.auth.token
  const userId = socket.handshake.auth.userId
  try{
    verifySocketToken(token, userId)
  }catch(error){
    console.log(chalk.bgRed("[ error ]"), "invalid socket token")
    return next(new Error("invalid socket token"))
  }
  next()
})
io.on("connection", (socket) => {
  //Initialise the controllers here
  streamInit(socket)
})
//////////

httpServer.listen(port, () => {
  console.log(chalk.bgGreen('[ ready ]'), (`http://localhost:${port}`))
})
