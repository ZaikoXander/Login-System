interface ButtonProps {
  children: string
  className?: string
}

export default function Button({ children, className }: ButtonProps) {
  return (
    <button
      type="submit"
      className={`
        ${className} bg-purple-500 rounded p-2 text-lg font-bold tracking-wide uppercase
        hover:bg-purple-600 transition-colors
      `}
    >
      { children }
    </button>
  )
}
