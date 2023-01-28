import { Box, Button, FormControl, FormHelperText, FormLabel, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"
import logo from "../../public/logo-sh.svg"
import { LayoutSign } from "@multi-stream/shared/ui"
import { useToggle } from 'apps/multi-stream/hooks/useToggle'

function Signup({ pageProps }: AppProps) {
  const [show, toggleShow] = useToggle(false)

  return (
    <>
      <Head>
        <title>Multi-stream | Signup</title>
      </Head>
      <LayoutSign title={"Creez votre compte"} logo={logo}>
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
            <FormLabel>Nom</FormLabel>
            <Input
              type='text'
              placeholder='Adrien'
            />
            <FormHelperText>Votre nom d&apos;utilisateur</FormHelperText>
          </FormControl>
          <FormControl mb="20px">
            <FormLabel>Mot de passe</FormLabel>
            <InputGroup>
              <Input
                type={show ? 'text' : 'password'}
                placeholder='Enter mot de passe'
              />
              <InputRightElement width='3.5rem'>
                <Button h='1.75rem' size='xs' onClick={() => toggleShow()}>
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
          <Button>S&apos;inscrire</Button>
        </Box>
      </LayoutSign>
    </>
  )
}

export default Signup
