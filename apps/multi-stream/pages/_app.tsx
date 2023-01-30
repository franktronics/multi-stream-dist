import { AppProps } from 'next/app'
import Head from 'next/head'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from "../theme/chakra.theme"
import "../style/base.scss"
import { UserProvider } from '../context/user.context'
import { StrictMode } from 'react'

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Multi-stream</title>
      </Head>
      <StrictMode>
        <main className="app">
            <ChakraProvider theme={theme}>
              <UserProvider>
                <Component {...pageProps} />
              </UserProvider>
            </ChakraProvider>
        </main>
      </StrictMode>
    </>
  )
}

export default CustomApp;
