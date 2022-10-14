import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import { ContextProvider } from '../contexts/Context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      {/*Global fonts bellow*/}
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" />
      </Head>
      
      <Component {...pageProps} />
    </ContextProvider>
  )
}

export default MyApp
