import { HTMLInputTypeAttribute } from "react"

interface InputProps {
  required?: boolean
  type: HTMLInputTypeAttribute
  id?: string
  placeholder?: string
  className?: string
}

export default function Input({ required = false, type, id, placeholder, className }: InputProps) {
  return (
    <input
      required={required}
      type={type}
      name={id || type}
      id={id || type}
      placeholder={placeholder}
      className={`
        ${className} rounded py-2 px-4 text-zinc-900
        focus:outline-none
      `}
    />
  )
}
