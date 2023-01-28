import { Box, Button, FormControl, FormHelperText, FormLabel, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"
import logo from "../../public/logo-sh.svg"
import { LayoutSign } from "@multi-stream/shared/ui"
import { useToggle } from 'apps/multi-stream/hooks/useToggle'

function Signin({ pageProps }: AppProps) {
  const [show, toggleShow] = useToggle(false)

  return (
    <>
      <Head>
        <title>Multi-stream | Signin</title>
      </Head>
      <LayoutSign title={"Connexion"} logo={logo}>
        <Box>
          <FormControl mb="20px">
            <FormLabel>Email</FormLabel>
            <Input
              type='email'
              placeholder='exemple@gmail.com'
            />
            <FormHelperText>Identifiant</FormHelperText>
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
            <FormHelperText>Cle de securité</FormHelperText>
          </FormControl>
        </Box>
        <Box>
          <Button>Connexion</Button>
        </Box>
      </LayoutSign>
    </>
  )
}

export default Signin
