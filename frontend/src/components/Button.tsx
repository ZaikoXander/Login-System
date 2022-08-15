interface ButtonProps {
  children: string
  className?: string
  disabled?: boolean
}

export default function Button({ children, className, disabled }: ButtonProps) {
  return (
    <button
      type="submit"
      className={`
        ${className} bg-purple-500 rounded p-2 text-lg font-bold tracking-wide uppercase
        hover:bg-purple-600 transition-colors
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-purple-500
      `}
      disabled={disabled}
    >
      { children }
    </button>
  )
}
