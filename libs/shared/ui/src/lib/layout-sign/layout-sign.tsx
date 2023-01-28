import styles from './layout-sign.module.scss'
import { Box, Text, Flex, Badge } from '@chakra-ui/react'
import Image from 'next/image'
import { PropsWithChildren } from 'react'
import { StaticImageData } from "next/dist/client/image"

/* eslint-disable-next-line */
export interface LayoutSignProps {
  title: string,
  logo: StaticImageData
}

export function LayoutSign(props: PropsWithChildren<LayoutSignProps>) {
  const { children, title, logo } = props

  return (
    <Box bg="light" h="100vh">
      <Flex flexDirection={"column"} align={"center"} justify={"center"} maxW="1440px" margin="0 auto">
        <Box alignSelf="start" m="10px" paddingBlock="10px">
          <Text textAlign="left" fontSize='lg' color="black.100" fontWeight="bold">Multi Chat &#8226; <Badge colorScheme='purple'>Beta</Badge></Text>
        </Box>
        <Box paddingBlock="0 20px">
          <Image src={logo} width={130} height={130} alt="Multi stream"/>
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
          <Text fontSize='4xl' pb="30px" color="black.100">{title}</Text>
          {children}
        </Box>
      </Flex>
    </Box>
  )
}

export default LayoutSign
