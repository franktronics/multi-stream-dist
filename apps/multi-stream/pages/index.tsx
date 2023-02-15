import { Box } from "@chakra-ui/react";
import { HomeDash, LayoutDashboard, Navbar, Slidebar } from "@multi-stream/shared/ui";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useDashboard } from "../context/dashboard.context";
import { useGetUser, useUser } from "../context/user.context";
import { useService } from "../utils/service";

export function Index({ pageProps }: AppProps) {
  const router = useRouter()
  const userContext = useUser()
  const [request] = useService()
  const dashboardContext = useDashboard()

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
    <LayoutDashboard>
      <Slidebar className="slidebar"/>
      <Navbar className="navbar" dashboardContext={dashboardContext}/>
      <Box as="main" className="home-dash-container" bg="blue.100">
        {dashboardContext.state === "sec2.child1"?
          <HomeDash/>
        : "Other"}
      </Box>
    </LayoutDashboard>
  )
}

export default Index
