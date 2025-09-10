import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useQuestionnaireResults } from "../../shared/hooks/questionnaire/useQuestionnaireResults"

const QuestionnaireResults = () => {
  const navigate = useNavigate()
  const { questionnaireId } = useParams() 
  const { results, loading } = useQuestionnaireResults(questionnaireId)

  // Helpers
  const nf2 = new Intl.NumberFormat("es-GT", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  const fmtDateTime = (d) =>
    new Date(d).toLocaleString("es-GT", {
      dateStyle: "full",
      timeStyle: "short",
    })

  if (!questionnaireId) return <p>No se proporcionó un cuestionario válido</p>
  if (loading) return <p>Cargando resultados...</p>
  if (!results) return <p>No hay datos disponibles</p>

  const { questionnaire, data } = results

  const allCompetencies = Array.from(
    new Map(
      data
        .flatMap(r => r.result?.competencies || [])
        .map(c => [c.competencyId, c])
    ).values()
  ).sort((a, b) => a.competencyNumber - b.competencyNumber)

  return (
    <div className="max-w-6xl mx-auto p-6 font-sans mt-8">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-500 hover:underline mb-4"
      >
        ← Regresar
      </button>

      <div className="bg-gray-50 shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">
          {questionnaire.title} - {questionnaire.course}
        </h2>
        <hr className="my-2" />
        <p className="text-sm mb-4">
          <strong>Total estudiantes:</strong> {results.total}
        </p>

        {allCompetencies.length > 0 && (
          <div className="mb-4">
            <h4 className="text-md font-semibold">Competencias evaluadas:</h4>
            <ul className="list-disc pl-6 text-sm">
              {allCompetencies.map((c) => (
                <li key={c.competencyId}>
                  {c.competencyNumber} - {c.competencyName}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-300 rounded-lg shadow-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">Estudiante</th>
                <th className="px-4 py-2 text-left">Correo</th>
                <th className="px-4 py-2 text-left">Estado</th>
                <th className="px-4 py-2 text-left">Nota (global)</th>
                <th className="px-4 py-2 text-left">Nota (permitida)</th>
                <th className="px-4 py-2 text-left">Ponderada</th>
                <th className="px-4 py-2 text-left">Aprobación</th>
                <th className="px-4 py-2 text-left">Fecha</th>
                <th className="px-4 py-2 text-left w-80">Competencias</th>
              </tr>
            </thead>
            <tbody>
              {data.map((r) => (
                <tr key={r.studentCourseId} className="border-b align-top">
                  <td className="px-4 py-2">{r.student}</td>
                  <td className="px-4 py-2">{r.email}</td>
                  <td className="px-4 py-2">
                    {r.result ? "Finalizado" : "Pendiente"}
                  </td>
                  <td className="px-4 py-2">
                    {r.result
                      ? `${nf2.format(r.result.scoreOverMaxGrade)}/
                         ${nf2.format(r.result.maxGrade)}`
                      : "—"}
                  </td>
                  <td className="px-4 py-2">
                    {r.result
                      ? `${nf2.format(r.result.scoreOverAllowedGrade)}/
                         ${nf2.format(r.result.maxAllowedGrade)}`
                      : "—"}
                  </td>
                  <td className="px-4 py-2">
                    {r.result ? nf2.format(r.result.weightedScore) : "—"}
                  </td>
                  <td className="px-4 py-2">
                    {r.result
                      ? r.result.approvalStatus === "Passed"
                        ? "Aprobado"
                        : "Reprobado"
                      : "—"}
                  </td>
                  <td className="px-4 py-2">
                    {r.result?.completionDate
                      ? fmtDateTime(r.result.completionDate)
                      : "—"}
                  </td>
                  <td className="px-4 py-2">
                    {r.result?.competencies?.length > 0 ? (
                      <ul className="list-disc pl-4">
                        {r.result.competencies
                          .sort((a, b) => a.competencyNumber - b.competencyNumber)
                          .map((c) => (
                            <li key={c.competencyId}>
                              Competencia {c.competencyNumber}: {c.correctAnswers}/
                              {c.totalQuestionsInCompetency} | Porcentaje:{" "}
                              {(c.percentage)}
                            </li>
                          ))}
                      </ul>
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default QuestionnaireResults
