import express from "express"
import {signup, signin, getUser} from "../httpControllers/user.controller"
const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/getuser', getUser)

export default router
