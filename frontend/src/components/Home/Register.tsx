import { ChangeEvent, FormEvent, useRef, useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import Router from "next/router"
import { setCookie } from "nookies"

import { api } from "../../libs/api"

import Input from "../Input"
import Button from "../Button"

import { HomeComponentsProps } from "./Interfaces"

interface UserData {
  email: string
  password: string
  confirmPassword: string
  captcha: string
}

interface ApiResponse {
  user: {
    email: string
    id: string
    createdAt: Date
  }
  token: string
}

export default function Register({ isRegistering, setIsRegistering }: HomeComponentsProps) {
  const [user, setUser] = useState<UserData>({ email: "", password: "", confirmPassword: "", captcha: "" })

  const captchaRef = useRef<ReCAPTCHA>(null)

  async function handleSubmitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    
    const captcha = captchaRef?.current?.getValue()
    
    if (!captcha) {
      return
    }

    setUser({ ...user, captcha: captcha })

    const res = await api.post<ApiResponse>("/auth/register", {
      email: user.email,
      password: user.password,
      confirmPassword: user.confirmPassword,
      captcha: user.captcha
    })

    const token = res.data.token

    captchaRef?.current?.reset()

    setCookie(null, "token", token)

    Router.push("/profile")
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, [event.target.name]: event.target.value })
  }

  return (
    <form onSubmit={handleSubmitForm} className="flex flex-col w-full">
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
        onChange={handleInputChange}
        invalid="Por favor digite um endereço de email válido."
      />
      <Input
        required
        type="password"
        name="password"
        placeholder="Senha"
        className="mb-2"
        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
        title="Deve conter pelo menos um número e uma letra maiúscula e minúscula, e pelo menos 6 ou mais caracteres."
        onChange={handleInputChange}
        invalid="Por favor digite uma senha válida."
      />
      <Input
        required
        type="password"
        name="confirmPassword"
        placeholder="Confirme a senha"
        className="mb-2"
        pattern={user.password}
        title="A senha deve corresponder a senha digitada anteriormente."
        onChange={handleInputChange}
        invalid="A senha não corresponde."
      />
      <ReCAPTCHA
        ref={captchaRef}
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
        theme="dark"
      />
      <Button
        className="mb-2 mt-3"
        disabled={
          user.email.length < 1 || user.password.length < 6 ||
          user.confirmPassword.length < 6 || user.confirmPassword !== user.password
        }
      >
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
          onClick={() => setIsRegistering(!isRegistering)}
        >
          Faça o login
        </a>
      </p>
    </form>
  )
}
