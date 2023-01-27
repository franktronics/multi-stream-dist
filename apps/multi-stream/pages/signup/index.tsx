import { Button } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import Head from 'next/head'

function Signup({ pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Multi-stream | Signup</title>
      </Head>
      <main className="app">
        <Button>Test</Button>
      </main>
    </>
  )
}

export default Signup
