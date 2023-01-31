import styles from './layout-sign.module.scss'
import { Box, Text, Flex, Badge } from '@chakra-ui/react'
import Image from 'next/image'
import { PropsWithChildren } from 'react'
import { StaticImageData } from "next/dist/client/image"
import { motion } from 'framer-motion'
import { ButtonTheme } from '@multi-stream/shared/ui'
import { useDashboard } from 'apps/multi-stream/context/dashboard.context'

/* eslint-disable-next-line */
export interface LayoutSignProps {
  title: string,
  logo: StaticImageData
}

export function LayoutSign(props: PropsWithChildren<LayoutSignProps>) {
  const { children, title, logo } = props
  const dashboardContext = useDashboard()

  return (
    <Box bg="light" minH="100vh" pb="20px">
      <Flex flexDirection={"column"} align={"center"} justify={"center"} maxW="1440px" margin="0 auto">
        <Flex alignSelf="start" padding="10px" w="100%" alignItems="center" justifyContent="space-between">
          <Text textAlign="left" fontSize='lg' color="black.100" fontWeight="bold">Multi Chat &#8226; <Badge colorScheme='purple'>Beta</Badge></Text>
          <ButtonTheme
            theme={dashboardContext.theme}
            toggle={dashboardContext.toggleTheme}
          />
        </Flex>
        <Box paddingBlock="0 20px">
          <Image src={logo} priority={true} width={130} height={130} alt="Multi stream"/>
        </Box>
            <Box
              flex='1'
              maxW={450}
              width={"calc(100% - 20px)"}
              p="20px"
              m="10px"
              bg="white"
              borderRadius={"md"}
              boxShadow="base"
            >
              <motion.div
                initial={{ translateY: 30, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1}}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20
                }}
              >
                <Text fontSize='4xl' pb="30px" color="black.100">{title}</Text>
                {children}
              </motion.div>
            </Box>
      </Flex>
    </Box>
  )
}

export default LayoutSign
