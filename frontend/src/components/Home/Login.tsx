import Head from "next/head"
import Link from "next/link"
import { Dispatch, SetStateAction } from "react"
import Input from "./Input"

interface LoginProps {
  isRegistering: boolean
  setIsRegistering: Dispatch<SetStateAction<boolean>>
}

export default function Login({ isRegistering, setIsRegistering }: LoginProps) {
  function handleRegisterClick() {
    setIsRegistering(!isRegistering)
  }

  return (
    <>
      <Head>
        <title>Login | Login-System</title>
      </Head>
      <form className="flex flex-col w-full">
        <h1
          className="font-bold text-lg mb-1"
        >
          Login
        </h1>
        <Input required type="email" placeholder="E-mail" className="mb-4" />
        <Input required type="password" placeholder="Senha" className="mb-2" />
        <Link href="/forgot">
          <a
            className="
              text-purple-600 underline mb-5
              hover:text-purple-700 transition-colors
            "
          >
            Esqueci minha senha
          </a>
        </Link>
        <button
          type="submit"
          className="
            bg-purple-500 rounded p-2 text-lg font-bold tracking-wider mb-2
            hover:bg-purple-600 transition-colors
          "
        >
          Entrar
        </button>
        <p>
          Não tem uma conta?{" "}
          <a
            role="button"
            className="
              text-purple-600 underline
              hover:text-purple-700 transition-colors
            "
            onClick={handleRegisterClick}
          >
            Registre-se
          </a>
        </p>
      </form>
    </>
  )
}
