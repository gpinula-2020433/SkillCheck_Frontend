import { useState } from "react"
import { createStudentRequest } from "../../../services/api"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(null)
  const navigate = useNavigate()

  const registerStudent = async (formData) => {
    setIsLoading(true)
    setError("")
    setSuccess(null)

    const response = await createStudentRequest(formData)
    setIsLoading(false)

    if (response.error) {
      const errorMessage = Array.isArray(response.message)
        ? response.message[0]?.msg || "Error desconocido"
        : response.message || "Error desconocido"

      toast.error(errorMessage)
      setError(errorMessage)
    } else {
      // Si la respuesta es exitosa
      setSuccess(response.message || "¡Estudiante registrado exitosamente!")
      toast.success(response.message || "¡Estudiante registrado exitosamente!")
      setTimeout(() => navigate("/auth/login"), 1500)
    }

    return response
  }

  return { registerStudent, isLoading, error, success }
}
