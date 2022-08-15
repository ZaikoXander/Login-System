import { ChangeEvent, HTMLInputTypeAttribute } from "react"

interface InputProps {
  required?: boolean
  type: HTMLInputTypeAttribute
  name?: string
  placeholder?: string
  className?: string
  pattern?: string
  title?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  invalid?: string
}

export default function Input({ required = false, type, name, placeholder, className, pattern, title, onChange, invalid }: InputProps) {
  return (
    <div className={className}>
      <input
        required={required}
        type={type}
        name={name || type}
        placeholder={placeholder}
        className="
          w-full peer rounded py-2 px-4 text-zinc-900
          focus:mb-0 focus:ring-2 focus:ring-purple-500 focus:outline-none
          invalid:mb-2 invalid:ring-2 invalid:ring-red-600
          invalid:placeholder-shown:mb-0 invalid:placeholder-shown:ring-0
          invalid:focus:placeholder-shown:ring-2
          transition-colors
        "
        pattern={pattern}
        title={title}
        onChange={onChange}
      />
      {
        invalid &&
          <p 
            className="
              hidden text-red-600 text-xs
              peer-invalid:block peer-focus:hidden
              peer-invalid:peer-placeholder-shown:hidden
              transition-all
            "
          >
            { invalid }
          </p>
      }
    </div>
  )
}
