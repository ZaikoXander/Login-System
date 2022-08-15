import { useState } from "react"
import Head from "next/head"

import Login from "../components/Home/Login"
import Register from "../components/Home/Register"

export default function Home() {
  const [isRegistering, setIsRegistering] = useState<boolean>(false)

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
