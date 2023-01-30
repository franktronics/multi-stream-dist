import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useGetUser, useUser } from "../context/user.context";
import { useService } from "../utils/service";

export function Index({ pageProps }: AppProps) {
  const router = useRouter()
  const userContext = useUser()
  const [request] = useService()

  useEffect(() => {
    useGetUser(userContext, request).then((result) => {
      if(result.status !== "success"){
        router.push("/signin")
      }else{
        userContext.setUser(result.data.user)
      }
    })
  }, [useGetUser])

  return (
    <div>
    </div>
  )
}

export default Index
