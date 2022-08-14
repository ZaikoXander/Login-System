import { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"

import Input from "../Input"
import Button from "../Button"

interface RegisterProps {
  isRegistering: boolean
  setIsRegistering: Dispatch<SetStateAction<boolean>>
}

export default function Register({ isRegistering, setIsRegistering }: RegisterProps) {
  const { register, handleSubmit, formState: { errors } } = useForm()

  function handleSubmitLogin(data: any) {
    console.log(data)
  }

  function handleLoginClick() {
    setIsRegistering(!isRegistering)
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitLogin)} className="flex flex-col w-full">
      <h1
        className="font-bold text-lg mb-1"
      >
        Registro
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
        name="password"
        placeholder="Senha"
        className="mb-2"
        register={register}
      />
      <Input
        required
        type="password"
        name="confirmPassword"
        placeholder="Confirme a senha"
        className="mb-5"
        register={register}
      />
      <Button className="mb-2">
        Registre-se
      </Button>
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
  )
}
