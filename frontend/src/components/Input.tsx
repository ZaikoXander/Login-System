import { HTMLInputTypeAttribute } from "react"
import { FieldValues, UseFormRegister } from "react-hook-form"

interface InputProps {
  required?: boolean
  type: HTMLInputTypeAttribute
  name?: string
  placeholder?: string
  className?: string
  register: UseFormRegister<FieldValues>
}

export default function Input({ required = false, type, name, placeholder, className, register}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`
        ${className} rounded py-2 px-4 text-zinc-900
        focus:outline-none
      `}
      {...register(name || type, { required })}
    />
  )
}
