import Link from "next/link"

export default function Profile() {
  return (
    <div className="flex flex-col items-center">
      <h1>Página de Perfil</h1>
      <Link href="/">
        <a
          className="
            text-zinc-300 underline w-fit
            hover:text-zinc-400 transition-colors
          "
        >
          Voltar
        </a>
      </Link>
    </div>
  )
}
