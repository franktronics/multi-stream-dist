import jwt from "jsonwebtoken"

const tokenKey = process.env.API_TOKEN_KEY

export const verifySocketToken = (token: string, id: string) => {

  jwt.verify(token, tokenKey, (err, decoded: {userId: string}) => {
    if (err || id != decoded.userId) {
      throw new Error("Requete non autorisee")
    }else{
      return token
    }
  })
}
