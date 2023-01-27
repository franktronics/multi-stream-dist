import { Box, Button, FormControl, FormHelperText, FormLabel, Input, Text, Flex, InputGroup, InputRightElement } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useState } from 'react'
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"
import logo from "../../public/logo-sh.svg"
import Image from "next/image"

function Signup({ pageProps }: AppProps) {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  return (
    <>
      <Head>
        <title>Multi-stream | Signup</title>
      </Head>
      <Box bg="light" h="100vh">
        <Flex flexDirection={"column"} align={"center"} justify={"center"} >
          <Box p="20px">
            <Image src={logo} width={150} height={150} alt="Multi stream"/>
          </Box>
          <Box
            flex='1'
            maxW={450}
            p="20px"
            m="10px"
            bg="white"
            borderRadius={"md"}
            boxShadow="base"
          >
            <Text fontSize='4xl' pb="20px" color="black.100">Creez votre compte</Text>
            <Box>
              <FormControl mb="20px">
                <FormLabel>Email</FormLabel>
                <Input
                  type='email'
                  placeholder='exemple@gmail.com'
                />
                <FormHelperText>Fait office d&apos;identifiant</FormHelperText>
              </FormControl>
              <FormControl mb="20px">
                <FormLabel>Mot de passe</FormLabel>
                <InputGroup>
                  <Input
                    type={show ? 'text' : 'password'}
                    placeholder='Enter mot de passe'
                  />
                  <InputRightElement width='3.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                      {show ? <AiOutlineEyeInvisible size="20px"/> : <AiOutlineEye size="20px"/>}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText>Au moins 6 caractères</FormHelperText>
              </FormControl>
              <FormControl mb="20px">
                <FormLabel>Vérifier</FormLabel>
                <Input
                  type={show ? 'text' : 'password'}
                  placeholder='Verifier mot de passe'
                />
                <FormHelperText>Repeter le mot de passe</FormHelperText>
              </FormControl>
            </Box>
            <Box>
              <Button bg="primary" color="#fff">S&apos;inscrire</Button>
            </Box>
          </Box>
        </Flex>
      </Box>
    </>
  )
}

export default Signup
