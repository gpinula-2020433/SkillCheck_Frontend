import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useStudentQuestionnaires } from "../../shared/hooks/questionnaire/useStudentQuestionnaires"

export const CourseQuestionnaire = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const { course } = state || {}

  if (!course) {
    navigate("/main/courses")
    return null
  }

  const { questionnaires, loading, error } = useStudentQuestionnaires({ courseId: course._id })

  return (
    <div className="max-w-4xl mx-auto p-5 font-sans mt-8">

      <button onClick={() => navigate(-1)} className="text-blue-500 hover:underline mb-4">
        ← Regresar
      </button>
      <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-2">{course.name}</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-2">{course.description || "Sin descripción"}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          <strong>Profesor:</strong> {course.teacher?.name} {course.teacher?.surname}
        </p>
      </div>

      <h2 className="text-lg font-semibold mb-4">Cuestionarios</h2>

      {loading && <p className="text-gray-500">Cargando cuestionarios...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {(!loading && questionnaires.length === 0) ? (
        <p className="text-gray-500">No hay cuestionarios para este curso</p>
      ) : (
        questionnaires.map((q) => (
          <div key={q._id} className="flex mb-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
            <div className="flex-1">
              <strong className="block">{q.title}</strong>
              <p className="text-gray-500 text-sm">
                  <p>{q.description}</p>
                <p><strong>Curso:</strong> {q.courseId?.name}</p>
                <p><strong>Nota máxima:</strong> {q.maxGrade}</p>
                <p><strong>Nota máxima permitida:</strong> {q.maxAllowedGrade}</p>
                <p><strong>Nota aprobatoria:</strong> {q.passingGrade}</p>
                <strong>Abre:</strong> {new Date(q.openDate).toLocaleDateString()} | 
                <strong> Cierra:</strong> {new Date(q.deadline).toLocaleDateString()}
              </p>
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => navigate(`/main/activity/${q._id}`, { state: { questionnaire: q } })}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Ir al cuestionario
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default CourseQuestionnaire
