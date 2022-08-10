import Head from "next/head"
import { Dispatch, SetStateAction } from "react"
import Input from "./Input"

interface RegisterProps {
  isRegistering: boolean
  setIsRegistering: Dispatch<SetStateAction<boolean>>
}

export default function Register({ isRegistering, setIsRegistering }: RegisterProps) {
  function handleLoginClick() {
    setIsRegistering(!isRegistering)
  }

  return (
    <>
      <Head>
        <title>Registro | Login-System</title>
      </Head>
      <form className="flex flex-col w-full">
        <h1
          className="font-bold text-lg mb-1"
        >
          Registro
        </h1>
        <Input required type="email" placeholder="E-mail" className="mb-4" />
        <Input required type="password" id="password" placeholder="Senha" className="mb-2" />
        <Input required type="password" id="confirmPassword" placeholder="Confirme a senha" className="mb-5" />
        <button
          type="submit"
          className="
            bg-purple-500 rounded p-2 text-lg font-bold tracking-wider mb-2
            hover:bg-purple-600 transition-colors
          "
        >
          Registre-se
        </button>
        <p>
          Já tem uma conta?{" "}
          <a
            role="button"
            className="
              text-purple-600 underline
              hover:text-purple-700 transition-colors
            "
            onClick={handleLoginClick}
          >
            Faça o login
          </a>
        </p>
      </form>
    </>
  )
}
