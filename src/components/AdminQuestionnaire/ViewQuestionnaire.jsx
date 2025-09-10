import React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useViewQuestionnaire } from "../../shared/hooks/questionnaire/useViewQuestionnaire"

export const ViewQuestionnaire = () => {
  const { questionnaireId } = useParams()
  const navigate = useNavigate()
  const { data, loading, error } = useViewQuestionnaire(questionnaireId)

  if (loading) return <p className="text-gray-500">Cargando cuestionario...</p>
  if (error) return <p className="text-red-500">{error}</p>
  if (!data) return null

  const { questionnaire, questions } = data

  const competencies = Array.from(
    new Map(
      questions
        .filter((q) => q.competency)
        .map((q) => [q.competency._id, q.competency])
    ).values()
  ).sort((a, b) => a.number - b.number)
  
  return (
    <div className="max-w-5xl mx-auto p-6 font-sans mt-8">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-500 hover:underline mb-4"
      >
        ← Regresar
      </button>

      <div className="bg-gray-50 shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-2">{questionnaire.title}</h2>
        <p className="text-gray-700 mb-2">{questionnaire.description}</p>
        <p className="text-sm text-gray-600">
          <strong>Curso:</strong> {questionnaire.courseId?.name}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Nota máxima:</strong> {questionnaire.maxGrade} |{" "}
          <strong>Nota Máxima permitida:</strong> {questionnaire.maxAllowedGrade} |{" "}
          <strong>Nota mínima para aprobar:</strong> {questionnaire.passingGrade}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Fecha de apertura:</strong>{" "}
          {new Date(questionnaire.openDate).toLocaleString("es-GT")}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Fecha límite:</strong>{" "}
          {new Date(questionnaire.deadline).toLocaleString("es-GT")}
        </p>

        {competencies.length > 0 && (
          <div className="mt-4 mb-2">
            <h4 className="text-md font-semibold">Competencias evaluadas:</h4>
            <ul className="list-disc pl-6 text-sm">
              {competencies.map((c) => (
                <li key={c._id}>
                  {c.number} - {c.competenceName}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {questions.length === 0 ? (
          <p className="text-gray-500">No hay preguntas registradas</p>
        ) : (
          questions.map((q, index) => (
            <div
              key={q._id}
              className="border rounded-lg shadow-sm p-4 bg-white"
            >
              <h3 className="font-semibold text-lg mb-2">
                Pregunta {index + 1}: {q.statement}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Tipo:</strong>{" "}
                {q.type === "CHOICE" ? "Selección múltiple" : "Respuesta abierta"}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Competencia:</strong> {q.competency?.number} -{" "}
                {q.competency?.competenceName}
              </p>
              <p className="text-sm text-gray-600 mb-3">
                <strong>Puntos:</strong> {q.points}
              </p>

              {q.type === "CHOICE" ? (
                <ul className="list-disc pl-6 text-sm">
                  {q.options.map((opt, i) => (
                    <li
                      key={i}
                      className={`${
                        opt.isCorrect ? "text-green-600 font-bold" : "text-gray-800"
                      }`}
                    >
                      {opt.text} {opt.isCorrect}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-800">
                  <strong>Respuesta correcta:</strong> {q.correctAnswer}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
