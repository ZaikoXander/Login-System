import Head from "next/head"
import Link from "next/link"
import { useForm } from "react-hook-form"

import Input from "../components/Input"
import Button from "../components/Button"

export default function Forgot() {
  const { register, handleSubmit, formState: { errors } } = useForm()

  function handleSubmitLogin(data: any) {
    console.log(data)
  }

  return (
    <>
      <Head>
        <title>Recuperar senha | Login-System</title>
      </Head>
      <main>
        <div className="w-80 h-52 p-4">
          <form onSubmit={handleSubmit(handleSubmitLogin)} className="flex flex-col items-center justify-center">
            <h1 className="font-bold text-2xl mb-6">Recuperar senha</h1>
            <Input
              required
              type="email"
              placeholder="Digite seu e-mail"
              className="mb-4 w-full"
              register={register}
            />
            <Button className="mb-2 w-full">
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
