import Head from "next/head"
import Link from "next/link"

export default function Forgot() {
  return (
    <>
      <Head>
        <title>Recuperar senha | Login-System</title>
      </Head>
      <div>
        <Link href="/">
          <a
            className="
              text-purple-600 underline
              hover:text-purple-700 transition-colors
            "
          >
            Voltar
          </a>
        </Link>
      </div>
    </>
  )
}
