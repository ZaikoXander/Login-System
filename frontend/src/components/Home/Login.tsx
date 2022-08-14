import { Dispatch, SetStateAction } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"

import Input from "../Input"
import Button from "../Button"

interface LoginProps {
  isRegistering: boolean
  setIsRegistering: Dispatch<SetStateAction<boolean>>
}

export default function Login({ isRegistering, setIsRegistering }: LoginProps) {
  const { register, handleSubmit, formState: { errors } } = useForm()

  function handleSubmitLogin(data: any) {
    console.log(data)
  }

  function handleRegisterClick() {
    setIsRegistering(!isRegistering)
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitLogin)} className="flex flex-col w-full">
      <h1 className="font-bold text-lg mb-1">
        Login
      </h1>
      <Input
        required
        type="email"
        placeholder="E-mail"
        className="mb-4"
        register={register}
      />
      <Input
        required
        type="password"
        placeholder="Senha"
        className="mb-2"
        register={register}
      />
      <Link href="/forgot">
        <a
          className="
            text-purple-600 underline mb-5 w-fit
            hover:text-purple-700 transition-colors
          "
        >
          Esqueci minha senha
        </a>
      </Link>
      <Button className="mb-2">
        Entrar
      </Button>
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
  )
}
