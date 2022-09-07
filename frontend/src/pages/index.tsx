import { useState } from "react"
import Head from "next/head"
import { parseCookies } from "nookies"

import Login from "../components/Home/Login"
import Register from "../components/Home/Register"

import { GetServerSidePropsContext } from "next"

export default function Home() {
  const [isRegistering, setIsRegistering] = useState<boolean>(false)

  /* useEffect(() => {
    const token = parseCookies().token

    if (token) {
      Router.push("/profile")
    }
  }, []) */

  return (
    <>
      <Head>
        <title>
          {
            isRegistering ?
              "Registro | Login-System"
              :
              "Login | Login-System"
          }
        </title>
      </Head>
      <main>
        <div className="bg-zinc-900 w-80 p-4 rounded shadow-md transition-all">
          {
            isRegistering ?
              <Register isRegistering={isRegistering} setIsRegistering={setIsRegistering} />
              :
              <Login isRegistering={isRegistering} setIsRegistering={setIsRegistering} />
          }
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  // normally you can write this in the "backend"
  /* const token = ctx.req.cookies.token */

  // for normal react applications I think is better to use js-cookie library
  // in our case that we are using Next.js, we will use nookies library

  const token = parseCookies(ctx).token

  if (!token) {
    return {
      props: {}
    }
  }

  return {
    redirect: {
        permanent: false,
        destination: "/profile"
      }
  }
}
