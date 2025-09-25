import React from "react"

export const TooManyRequests = () => {
  const lastRoute = localStorage.getItem("lastRoute") || "/"

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-6 bg-white shadow-xl rounded-lg">
        <h1 className="text-4xl font-bold text-red-600">Too Many Requests</h1>
        <p className="mt-4 text-lg text-gray-700">
          Has realizado demasiadas solicitudes en un corto periodo de tiempo. Por favor, espera un momento y vuelve a intentarlo más tarde.
        </p>
        <button
          onClick={() => (window.location.href = lastRoute)}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Reintentar
        </button>
      </div>
    </div>
  )
}

export default TooManyRequests
