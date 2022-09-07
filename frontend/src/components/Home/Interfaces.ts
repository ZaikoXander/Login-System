import { Dispatch, SetStateAction } from "react"

export interface HomeComponentsProps {
  isRegistering: boolean
  setIsRegistering: Dispatch<SetStateAction<boolean>>
}
