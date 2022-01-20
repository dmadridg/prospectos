import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { Windmill } from '@windmill/react-ui'
import Layout from '../components/Layout'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Windmill>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Windmill>
    </SessionProvider>
  )
}