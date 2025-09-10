import React from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../shared/hooks/auth/context/AuthProvider"
import { useStudentQuestionnaires } from '../../shared/hooks/questionnaire/useStudentQuestionnaires'

export const Timeline = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { questionnaires, loading } = useStudentQuestionnaires({ status: 'pending' })
  
  if (loading) return <p>Cargando cuestionarios...</p>

  return (
    <div className="max-w-4xl mx-auto p-5 font-sans mt-8">
      {user && (
        <div className="mb-4 p-4 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-md">
          Bienvenido, <strong>{user.name}</strong>!
        </div>
      )}

      <h1 className="text-2xl font-bold mb-2">Línea de tiempo</h1>
      <p className="text-gray-600 mb-6">Revisa y completa los cuestionarios asignados</p>

      <h2 className="text-lg font-semibold mb-4">Próximos</h2>

      {questionnaires.length === 0 ? (
        <p>No hay cuestionarios pendientes</p>
      ) : (
        questionnaires.map((q) => (
          <div key={q._id} className="flex mb-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
            <div className="flex-1">
              <strong className="block">{q.title}</strong>
              <p className="text-gray-600 dark:text-gray-300 my-1">
                <strong>Curso:</strong> {q.courseId.name}
              </p>
              <p className="text-gray-500 text-sm">
                <strong>Abre:</strong> {new Date(q.openDate).toLocaleDateString()} | <strong>Cierra:</strong> {new Date(q.deadline).toLocaleDateString()}
              </p>
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => navigate(`/main/activity/${q._id}`, { state: { questionnaire: q } })}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Resolver cuestionario
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default Timeline