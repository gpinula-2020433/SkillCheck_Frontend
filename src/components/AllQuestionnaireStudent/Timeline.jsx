import React, { useState, useMemo, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../shared/hooks/auth/context/AuthProvider"
import { useStudentQuestionnaires } from '../../shared/hooks/questionnaire/useStudentQuestionnaires'

export const Timeline = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { questionnaires, loading } = useStudentQuestionnaires({status: 'pending'})

  const [showOnlyAvailable, setShowOnlyAvailable] = useState(() => {
    const saved = localStorage.getItem("showOnlyAvailable")
    return saved !== null ? JSON.parse(saved) : true
  })
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    localStorage.setItem("showOnlyAvailable", JSON.stringify(showOnlyAvailable))
  }, [showOnlyAvailable])

  const now = useMemo(() => new Date(), [])

  const filteredQuestionnaires = useMemo(() => {
    if (!showOnlyAvailable) return questionnaires

    return questionnaires.filter(q => {
      const open = new Date(q.openDate)
      const close = new Date(q.deadline)
      return open <= now && now < close
    })
  }, [questionnaires, showOnlyAvailable, now])

  const groupedByDate = useMemo(() => {
    return filteredQuestionnaires.reduce((acc, q) => {
      const dateKey = new Date(q.deadline).toLocaleDateString("es-GT", {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      })
      if (!acc[dateKey]) acc[dateKey] = []
      acc[dateKey].push(q)
      return acc
    }, {})
  }, [filteredQuestionnaires])

  const formatTime = (d) =>
    new Date(d).toLocaleTimeString("es-GT", { hour: '2-digit', minute: '2-digit' })

  if (loading) return <p>Cargando cuestionarios...</p>

  return (
    <div className="max-w-4xl mx-auto p-5 font-sans mt-8">
      {user && (
        <div className="mb-6 text-center text-blue-500 dark:text-white text-xl font-medium">
          Bienvenido, <strong>{user.name}</strong>!
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3 relative">
        <div>
          <h1 className="text-2xl font-bold">Línea de tiempo</h1>
          <p className="text-gray-600">Revisa y completa los cuestionarios asignados</p>
        </div>

        <div className="relative inline-block text-left">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600 px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition flex items-center justify-between w-full sm:w-auto"
          >
            {showOnlyAvailable ? "Disponibles" : "Todos"}
            <svg
              className="ml-2 h-4 w-4 text-gray-600 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-md z-10">
              <button
                onClick={() => {
                  setShowOnlyAvailable(true)
                  setShowDropdown(false)
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  showOnlyAvailable ? 'font-semibold text-blue-600 dark:text-blue-400' : ''
                }`}
              >
                Ver solo disponibles
              </button>
              <button
                onClick={() => {
                  setShowOnlyAvailable(false)
                  setShowDropdown(false)
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  !showOnlyAvailable ? 'font-semibold text-blue-600 dark:text-blue-400' : ''
                }`}
              >
                Ver todos
              </button>
            </div>
          )}
        </div>
      </div>

      {Object.keys(groupedByDate).length === 0 ? (
        <p>No hay cuestionarios {showOnlyAvailable ? "disponibles actualmente" : "que mostrar"}.</p>
      ) : (
        Object.keys(groupedByDate)
          .sort((a, b) =>
            new Date(groupedByDate[a][0].deadline) - new Date(groupedByDate[b][0].deadline)
          )
          .map((date) => (
            <div key={date} className="mb-6">
              <h2 className="text-lg font-semibold mb-2">{date}</h2>
              <div className="space-y-4">
                {groupedByDate[date].map((q) => (
                  <div key={q._id} className="flex items-center space-x-4">
                    <div className="w-16 flex justify-center">
                      <div className="text-gray-500 dark:text-gray-400 text-sm font-mono">
                        {formatTime(q.deadline)}
                      </div>
                    </div>

                    <div className="flex-1 bg-gray-100 dark:bg-gray-800 p-4 rounded-md shadow-sm flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <strong className="block">{q.title}</strong>
                        <p className="text-gray-600 dark:text-gray-300">
                          Se cierra Cuestionario - {q.courseId.name}
                        </p>
                      </div>

                      <div className="mt-4 md:mt-0 md:ml-4 flex justify-end">
                        <button
                          onClick={() =>
                            navigate(`/main/activity/${q._id}`, {
                              state: { questionnaire: q }
                            })
                          }
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                          Resolver cuestionario
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
      )}
    </div>
  )
}

export default Timeline
