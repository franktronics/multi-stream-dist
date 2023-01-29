import { Box, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"
import logo from "../../public/logo-sh.svg"
import { LayoutSign } from "@multi-stream/shared/ui"
import { useToggle } from 'apps/multi-stream/hooks/useToggle'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useState } from 'react'
import BeatLoader from "react-spinners/BeatLoader"
import { useService } from 'apps/multi-stream/utils/service'
import { useRouter } from 'next/router'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Cookies from 'js-cookie'
import { useUser } from 'apps/multi-stream/context/user.context'
import Link from 'next/link'

type SigninDataProps = {
  email: string,
  password: string
}
let signinSchema = yup.object().shape({
  email: yup.string().email("Email invalide").required("Email est obligatoire"),
  password: yup.string().required("Entrez le mot de passe")
})

function Signin({ pageProps }: AppProps) {
  const [request] = useService()
  const router = useRouter()
  const userContext = useUser()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SigninDataProps>({
    resolver: yupResolver(signinSchema)
  })
  const [show, toggleShow] = useToggle(false)
  const [state, setState] = useState<'pending' | 'finish'>("finish")

  const submit = async (data: SigninDataProps) => {
    setState("pending")
    const result = await request({
      endpoint: 'user/signin',
      method: "POST",
      anonymous: true,
      data: {
        email: data.email,
        password: data.password
      }
    })
    setState("finish")
    if(result.status === "success"){
      toast.success(result.message)
      Cookies.set('userId', result.data.userId)
      Cookies.set('token', result.data.token)
      userContext.setUser(result.data.user)
      router.push("/")
    }else{
      toast[`${result.status}`](result.message)
    }
  }

  return (
    <>
      <Head>
        <title>Multi-stream | Signin</title>
      </Head>
      <ToastContainer toastClassName="toast-custom-body"/>
      <LayoutSign title={"Connexion"} logo={logo}>
        <form onSubmit={handleSubmit(submit)}>
          <Box>
            <FormControl mb="20px" isInvalid={errors.email? true: false}>
              <FormLabel>Email</FormLabel>
              <Input
                {...register("email")}
                type='email'
                placeholder='exemple@gmail.com'
              />
              {errors.email? (
                <FormErrorMessage color="error">{errors.email.message}</FormErrorMessage>
              ) : (
                <FormHelperText>Identifiant</FormHelperText>
              )}
            </FormControl>
            <FormControl mb="20px" isInvalid={errors.password? true: false}>
              <FormLabel>Mot de passe</FormLabel>
              <InputGroup>
                <Input
                  {...register("password")}
                  type={show ? 'text' : 'password'}
                  placeholder='Enter mot de passe'
                />
                <InputRightElement width='3.5rem'>
                  <Button h='1.75rem' size='xs' onClick={() => toggleShow()}>
                    {show ? <AiOutlineEyeInvisible size="20px"/> : <AiOutlineEye size="20px"/>}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {errors.password? (
                <FormErrorMessage color="error">{errors.password.message}</FormErrorMessage>
              ) : (
                <FormHelperText>Entrez votre mot de passe</FormHelperText>
              )}
            </FormControl>
          </Box>
          <Box>
            <Button
              isLoading={state === "pending"}
              spinner={<BeatLoader color='#fff' size={10}/>}
              type='submit'
            >
              Connexion
            </Button>
          </Box>
          <Box pt="20px" textAlign="center" color="black.100">
            <Link href="/signup">
              Creer un compte
            </Link>
          </Box>
        </form>
      </LayoutSign>
    </>
  )
}

export default Signin
