import { ChangeEvent, FormEvent, useState } from "react"
import Link from "next/link"
import Router from "next/router"
import { setCookie } from "nookies"

import { api } from "../../libs/api"

import Input from "../Input"
import Button from "../Button"

import { HomeComponentsProps } from "./Interfaces"

interface UserData {
  email: string
  password: string
}

interface ApiResponse {
  user: {
    email: string
    id: string
    createdAt: Date
    v: number
  }
  token: string
}

export default function Login({ isRegistering, setIsRegistering }: HomeComponentsProps) {
  const [user, setUser] = useState<UserData>({ email: "", password: "" })

  async function handleSubmitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    
    const res = await api.post<ApiResponse>("/auth/authenticate", {
      email: user.email,
      password: user.password
    })

    const token = res.data.token

    setCookie(null, "token", token)

    Router.push("/profile")
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, [event.target.name]: event.target.value })
  }

  return (
    <form onSubmit={handleSubmitForm} className="flex flex-col w-full">
      <h1 className="font-bold text-lg mb-1">
        Login
      </h1>
      <Input
        required
        type="email"
        placeholder="E-mail"
        className="mb-2"
        onChange={handleInputChange}
        invalid="Por favor digite um endereço de email válido."
      />
      <Input
        required
        type="password"
        placeholder="Senha"
        className="mb-2"
        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
        title="Deve conter pelo menos um número e uma letra maiúscula e minúscula, e pelo menos 6 ou mais caracteres"
        onChange={handleInputChange}
        invalid="Por favor digite uma senha válida."
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
      <Button 
        className="mb-2"
        disabled={ user.email.length < 1 || user.password.length < 6 }
      >
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
          onClick={() => setIsRegistering(!isRegistering)}
        >
          Registre-se
        </a>
      </p>
    </form>
  )
}
