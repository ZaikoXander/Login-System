import { FormEvent, useState } from "react"
import Head from "next/head"
import Link from "next/link"

import Input from "../components/Input"
import Button from "../components/Button"

export default function Forgot() {
  const [email, setEmail] = useState<string>("")

  function handleSubmitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log(email)
  }

  return (
    <>
      <Head>
        <title>Recuperar senha | Login-System</title>
      </Head>
      <main>
        <div className="w-80 h-52 p-4">
          <form onSubmit={handleSubmitForm} className="flex flex-col items-center justify-center">
            <h1 className="font-bold text-2xl mb-6">Recuperar senha</h1>
            <Input
              required
              type="email"
              placeholder="Digite seu e-mail"
              className="mb-4 w-full"
              onChange={event => setEmail(event.target.value)}
            />
            <Button
              className="mb-2 w-full"
              disabled={ email.length < 1 }
            >
              Recuperar
            </Button>
            <Link href="/">
              <a
                className="
                  text-zinc-300 underline w-fit
                  hover:text-zinc-400 transition-colors
                "
              >
                Voltar
              </a>
            </Link>
          </form>
        </div>
      </main>
    </>
  )
}
