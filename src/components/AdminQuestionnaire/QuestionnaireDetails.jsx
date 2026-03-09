import React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useCourseQuestionnaires } from "../../shared/hooks/questionnaire/useCourseQuestionnaires"
import { BackButton } from '../BackButton'

export const QuestionnaireDetails = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const { questionnaires, loading, error, infoMessage } = useCourseQuestionnaires(courseId)

  return (
    <div className="max-w-5xl mx-auto p-6 font-sans mt-8">
      <BackButton className="mb-4" />

      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Detalles del Curso</h1>
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Cuestionarios registrados en este curso</h2>

      <div className="mb-4">
        <button
          onClick={() => navigate(`/admin/questionnaire/create/${courseId}`)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold"
        >
          Agregar cuestionario
        </button>
      </div>

      {loading && <p className="text-gray-500 dark:text-gray-400">Cargando cuestionarios...</p>}

      {/* Mostrar un mensaje informativo si no hay cuestionarios */}
      {infoMessage && (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-[700px] w-full text-left border border-gray-200 dark:border-gray-600">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 font-bold text-gray-800 dark:text-gray-200 w-1/4">Título</th>
                <th className="px-6 py-3 font-bold text-gray-800 dark:text-gray-200 w-2/4">Descripción</th>
                <th className="px-6 py-3 font-bold text-gray-800 dark:text-gray-200 w-1/4">Opciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="3" className="px-6 py-3 text-center text-black dark:text-gray-200">
                  {infoMessage} {/* Mensaje informativo */}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Mostrar los cuestionarios si hay */}
      {!loading && !error && !infoMessage && (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-[700px] w-full text-left border border-gray-200 dark:border-gray-600">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 font-bold text-gray-800 dark:text-gray-200 w-1/4">Título</th>
                <th className="px-6 py-3 font-bold text-gray-800 dark:text-gray-200 w-2/4">Descripción</th>
                <th className="px-6 py-3 font-bold text-gray-800 dark:text-gray-200 w-1/4">Opciones</th>
              </tr>
            </thead>
            <tbody>
              {questionnaires.map((q) => (
                <tr key={q._id} className="border-t dark:border-gray-600">
                  <td className="px-6 py-3 text-gray-800 dark:text-gray-200">{q.title}</td>
                  <td className="px-6 py-3 text-gray-800 dark:text-gray-200">{q.description}</td>
                  <td className="px-6 py-3">
                    <div className="flex space-x-2 justify-start">
                      <button
                        onClick={() => navigate(`/admin/questionnaire/view/${q._id}`)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded"
                      >
                        Ver cuestionario
                      </button>
                      <button
                        onClick={() => navigate(`/admin/questionnaire/results/${q._id}`)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded"
                      >
                        Ver resultados
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
