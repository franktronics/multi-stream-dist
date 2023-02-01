import {Request, Response, NextFunction} from 'express'
import { PrismaClient } from '@prisma/client'
import { AES, enc } from "crypto-js"
import jwt from "jsonwebtoken"
import chalk from "chalk"

const cryptoKey = process.env.API_CRYPTO_KEY
const tokenKey = process.env.API_TOKEN_KEY

const prisma = new PrismaClient()
type ReqSignup = {
  email: string,
  name: string,
  password: string
}

export const signup = async (req: Request<ReqSignup>, res: Response, next: NextFunction) => {
  try{
    const searchUser = await prisma.user.findUnique({
      where: {email: req.body.email}
    })
    if(searchUser){
      return res.status(401).json("Adresse mail déjà utilisée")
    }

    const hashPassword = AES.encrypt(req.body.password, cryptoKey).toString()
    await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name.trim(),
        password: hashPassword
      }
    })
    res.status(201).json({message: "Compte crée"})
  }catch(error){
    console.log(chalk.bgRed("signup error"), error)
    res.status(500).json("Une erreur est survenu")
    next()
  }
}

export const signin = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email
      }
    })
    if(!user){
      return res.status(404).json("Utilisateur non trouvé")
    }

    const dePassword = AES.decrypt(user.password, cryptoKey).toString(enc.Utf8)
    if(req.body.password !== dePassword){
      return res.status(401).json("Mot de passe incorrecte")
    }

    let returnUser = user
    delete returnUser.password

    res.status(200).json({
      message: "Connexion réussie",
      userId: user.id,
      token: jwt.sign(
        {userId: user.id},
        ''+tokenKey+'',
        { expiresIn: '24h'}
      ),
      user: user
    })
  }catch(error){
    console.log(chalk.bgRed("signup error"), error)
    res.status(500).json("Une erreur est survenu")
    next()
  }
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try{
    if(req.query.id){
      const user = await prisma.user.findUnique({
        where: {id: parseInt(req.query.id.toString())}
      })
      if (user) {
        let returnUser = user
        delete returnUser.password
        return res.status(200).json({
          message: "Utilisateur trouvé",
          user: returnUser
        })
      }else{
        return res.status(404).json("Utilisateur non trouvé")
      }
    }else{
      return res.status(401).json("Paramètre incorrectes")
    }
  }catch(error){
    console.log(chalk.bgRed("getuser error"), error)
    res.status(500).json("Une erreur est survenu")
    next()
  }
}
