import { useState } from "react"
import { loginRequest } from "../../../services/api"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./context/AuthProvider"
import toast from "react-hot-toast"

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { setUser } = useAuth()

  const login = async (userLogin, password) => {
    setIsLoading(true)
    setError("")

    const userLoginData = { userLogin, password }
    const response = await loginRequest(userLoginData)
    setIsLoading(false)

    if (response.error) {
      const errorMessage = Array.isArray(response.message)
        ? response.message[0]?.msg || "Error desconocido"
        : response.message || "Error desconocido"

      toast.error(errorMessage)
      setError(errorMessage)
    } else {
      setUser(response.loggedUser) // actualizar contexto
      toast.success(response.message || "¡Inicio de sesión exitoso!")
      navigate("/main")
    }
  }

  return { login, isLoading, error }
}
