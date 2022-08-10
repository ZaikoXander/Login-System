import { useState } from "react"

import Login from "../components/Home/Login"
import Register from "../components/Home/Register"

export default function Home() {
  const [isRegistering, setIsRegistering] = useState<boolean>(false)

  return (
    <main>
      <div className={`bg-zinc-900 w-80 p-4 rounded shadow-md transition-all ${isRegistering ? "h-80" : "h-72"}`}>
        {
          isRegistering ?
            <Register isRegistering={isRegistering} setIsRegistering={setIsRegistering} />
            :
            <Login isRegistering={isRegistering} setIsRegistering={setIsRegistering} />
        }
      </div>
    </main>
  )
}
