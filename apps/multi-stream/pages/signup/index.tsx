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
import { useService } from 'apps/multi-stream/utils/service'
import { useState } from 'react'
import BeatLoader from "react-spinners/BeatLoader"
import { useRouter } from 'next/router'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type SignupDataProps = {
  email: string,
  name: string,
  password: string,
  checkPassword: string
}
let signupSchema = yup.object().shape({
  name: yup.string().required("Entrer votre nom"),
  email: yup.string().email("Entrer une adresse valide").required("Email est obligatoire"),
  password: yup.string().min(6, "Au moins 6 caractères"),
  checkPassword: yup.string().oneOf([yup.ref("password"), null], "Ne correspond pas")
})

function Signup({ pageProps }: AppProps) {
  const [request] = useService()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignupDataProps>({
    resolver: yupResolver(signupSchema)
  })
  const [show, toggleShow] = useToggle(false)
  const [state, setState] = useState<'pending' | 'finish'>("finish")

  const submit = async (data: SignupDataProps) => {
    setState("pending")
    const result = await request({
      endpoint: 'user/signup',
      method: "POST",
      anonymous: true,
      data: {
        name: data.name,
        email: data.email,
        password: data.password
      }
    })
    setState("finish")
    if(result.status === "success"){
      toast.success(result.message)
      router.push("/signin")
    }else{
      toast[`${result.status}`](result.message)
    }
  }

  return (
    <>
      <Head>
        <title>Multi-stream | Signup</title>
      </Head>
      <ToastContainer toastClassName="toast-custom-body"/>
      <LayoutSign title={"Creez votre compte"} logo={logo}>
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
                <FormHelperText>Fait office d&apos;identifiant</FormHelperText>
              )}
            </FormControl>
            <FormControl mb="20px" isInvalid={errors.name? true: false}>
              <FormLabel>Nom</FormLabel>
              <Input
                {...register("name")}
                type='text'
                placeholder='Adrien'
              />
              {errors.name? (
                <FormErrorMessage color="error">{errors.name.message}</FormErrorMessage>
              ) : (
                <FormHelperText>Votre nom d&apos;utilisateur</FormHelperText>
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
                <FormHelperText>Au moins 6 caractères</FormHelperText>
              )}
            </FormControl>
            <FormControl mb="20px" isInvalid={errors.checkPassword? true: false}>
              <FormLabel>Vérifier</FormLabel>
              <Input
                {...register("checkPassword")}
                type={show ? 'text' : 'password'}
                placeholder='Verifier mot de passe'
              />
              {errors.checkPassword? (
                <FormErrorMessage color="error">{errors.checkPassword.message}</FormErrorMessage>
              ) : (
                <FormHelperText>Repeter le mot de passe</FormHelperText>
              )}
            </FormControl>
          </Box>
          <Box>
            <Button
              isLoading={state === "pending"}
              spinner={<BeatLoader color='#fff' size={10}/>}
              type='submit'
            >
              S&apos;inscrire
            </Button>
          </Box>
        </form>
      </LayoutSign>
    </>
  )
}

export default Signup
