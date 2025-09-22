import React, { createContext, useState, useContext, useEffect } from "react"

const LoadingContext = createContext()
let setLoadingGlobal = null

export const useLoading = () => useContext(LoadingContext)
export const getLoadingSetter = () => setLoadingGlobal

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoadingGlobal = setLoading
  }, [])

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {loading && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 z-50">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-32 h-32 animate-bounce mb-6"
          />
          <h1 className="mt-6 text-2xl font-bold text-gray-700 animate-pulse">
            CARGANDO...
          </h1>
        </div>
      )}
      {children}
    </LoadingContext.Provider>
  )
}