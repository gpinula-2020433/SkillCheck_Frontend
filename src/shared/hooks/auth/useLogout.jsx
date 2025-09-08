import { useAuth } from "./context/AuthProvider"
import { logoutRequest } from "../../../services/api"
import toast from "react-hot-toast"

export const useLogout = () => {
  const { setUser } = useAuth()

  const logout = async () => {
    const response = await logoutRequest()
    if (!response.error) {
      setUser(null)
      toast.success(response.message || "Sesión cerrada correctamente")
    } else {
      toast.error(response.message || "Error al cerrar sesión")
    }
  }

  return { logout }
}
