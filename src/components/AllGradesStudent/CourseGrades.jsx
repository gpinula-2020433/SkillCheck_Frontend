import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useStudentCourseResults } from '../../shared/hooks/questionnaire/useStudentCourseResults'

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

  if (loading) return <p>Cargando resultados...</p>
  if (!results) return <p>No hay resultados disponibles</p>

  return (
    <div className="max-w-6xl mx-auto p-6 font-sans mt-8">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-500 hover:underline mb-4"
      >
        ← Regresar
      </button>

      <h2 className="text-2xl font-bold mb-4">Curso: {results.course}</h2>

      {results.data.length === 0 ? (
        <p>No hay cuestionarios asignados</p>
      ) : (
        results.data.map((q) => (
          <div key={q.questionnaireId} className="mb-6 p-4 bg-gray-50 shadow-md rounded-lg">
            <h3 className="text-lg font-semibold mb-2">{q.title}</h3>
            <p className="text-sm mb-2">
              Abre: {new Date(q.openDate).toLocaleDateString()} | Cierra: {new Date(q.deadline).toLocaleDateString()}
            </p>

            <table className="w-full text-sm border border-gray-300 rounded-lg shadow-sm">
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-2 font-medium bg-gray-100">Nota máxima (global)</td>
                  <td className="px-4 py-2">
                    {q.result ? `${nf2.format(q.result.scoreOverMaxGrade)} / ${nf2.format(q.result.maxGrade)}` : "—"}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-medium bg-gray-100">Nota (sobre máximo permitido)</td>
                  <td className="px-4 py-2">
                    {q.result ? `${nf2.format(q.result.scoreOverAllowedGrade)} / ${nf2.format(q.result.maxAllowedGrade)}` : "—"}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-medium bg-gray-100">Nota final ponderada (sobre 100)</td>
                  <td className="px-4 py-2">{q.result ? nf2.format(q.result.weightedScore) : "—"}</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-medium bg-gray-100">Nota aprobatoria</td>
                  <td className="px-4 py-2">{q.result ? nf2.format(q.result.passingGrade) : "—"}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium bg-gray-100">Resultado</td>
                  <td className="px-4 py-2">{q.result ? q.result.approvalStatus : "Pendiente"}</td>
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
