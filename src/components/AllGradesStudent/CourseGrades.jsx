import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useStudentCourseResults } from '../../shared/hooks/questionnaire/useStudentCourseResults'
import { BackButton } from '../BackButton'

export const CourseGrades = () => {
  const navigate = useNavigate()
  const { id: courseId } = useParams()
  const { results, loading } = useStudentCourseResults(courseId)

  const nf2 = new Intl.NumberFormat("es-GT", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const fmtDateTime = (d) =>
    new Date(d).toLocaleString("es-GT", { dateStyle: "full", timeStyle: "short" })

  if (loading) return <p className="text-gray-500 dark:text-gray-400">Cargando resultados...</p>
  if (!results) return <p className="text-gray-800 dark:text-gray-200">No hay resultados disponibles</p>

  return (
    <div className="max-w-6xl mx-auto p-6 font-sans mt-8">
      <BackButton className="mb-4" />

      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Curso: {results.course}</h2>

      {results.data.length === 0 ? (
        <p className="text-gray-800 dark:text-gray-200">No hay cuestionarios asignados</p>
      ) : (
        results.data.map((q) => (
          <div key={q.questionnaireId} className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 shadow-md rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">{q.title}</h3>
            <p className="text-sm mb-2 text-gray-600 dark:text-gray-400">
              Abre: {new Date(q.openDate).toLocaleDateString()} | Cierra: {new Date(q.deadline).toLocaleDateString()}
            </p>

            <table className="w-full text-sm border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm">
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-2 font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">Nota máxima (global)</td>
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                    {q.result ? `${nf2.format(q.result.scoreOverMaxGrade)} / ${nf2.format(q.result.maxGrade)}` : "—"}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">Nota (sobre máximo permitido)</td>
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                    {q.result ? `${nf2.format(q.result.scoreOverAllowedGrade)} / ${nf2.format(q.result.maxAllowedGrade)}` : "—"}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">Nota final ponderada (sobre 100)</td>
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{q.result ? nf2.format(q.result.weightedScore) : "—"}</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">Nota aprobatoria</td>
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{q.result ? nf2.format(q.result.passingGrade) : "—"}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">Resultado</td>
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{q.result ? q.result.approvalStatus : "Pendiente"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  )
}

export default CourseGrades
