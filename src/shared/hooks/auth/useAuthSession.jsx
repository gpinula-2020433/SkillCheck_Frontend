import { useState, useEffect } from "react"
import { getAuthenticatedUserRequest } from "../../../services/api"

export const useAuthSession = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      const res = await getAuthenticatedUserRequest()
      if (!res.error) {
        setUser(res.user)
      } else {
        setUser(null)
      }
      setLoading(false)
    }
    checkSession()
  }, [])

  return { user, loading, setUser }
}
