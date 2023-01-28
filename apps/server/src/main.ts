import express, {Express} from 'express'
import chalk from "chalk"
import cors from "cors"
import { verifyToken } from "./middleware/authJwt"

import userRoutes from "./routes/user.routes"

const port = process.env.API_PORT ? Number(process.env.API_PORT) : 3000
const app: Express = express()

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

app.listen(port, () => {
  console.log(chalk.green(`[ ready ] http://localhost:${port}`))
})
