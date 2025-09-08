import { createContext, useContext } from "react"
import { useAuthSession } from "../useAuthSession"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const { user, loading, setUser } = useAuthSession()

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
