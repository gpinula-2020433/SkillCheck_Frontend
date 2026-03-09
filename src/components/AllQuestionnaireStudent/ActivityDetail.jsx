import React, { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Modal from "react-modal"
import { useStudentAttempt } from "../../shared/hooks/questionnaire/useStudentAttempt"
import { BackButton } from '../BackButton'

const ActivityDetail = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { questionnaire } = location.state || {}
  const [showConfirm, setShowConfirm] = useState(false)
  const [hasSavedAnswers, setHasSavedAnswers] = useState(false)

  const { attempt, loading } = useStudentAttempt(questionnaire?._id)

  // Verificar si hay respuestas guardadas en localStorage
  useEffect(() => {
    if (!questionnaire?._id) return
    const key = `answers_${questionnaire._id}`
    const saved = localStorage.getItem(key)
    setHasSavedAnswers(!!saved)
  }, [questionnaire])

  if (!questionnaire) return <p className="text-gray-800 dark:text-gray-200">Cuestionario no encontrado</p>
  if (loading) return <p className="text-gray-500 dark:text-gray-400">Cargando intento...</p>

  const handleStart = () => {
    setShowConfirm(false)
    navigate(`/main/questionnaire/${questionnaire._id}`, { state: { questionnaire } })
  }

  // Helpers de formato (números con 2 decimales y fecha en español Guatemala)
  const nf2 = new Intl.NumberFormat("es-GT", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const fmtDateTime = (d) =>
    new Date(d).toLocaleString("es-GT", {
      dateStyle: "full",
      timeStyle: "medium",
    })

  const maxGrade =
    attempt?.maxGrade ?? attempt?.questionnaireId?.maxGrade ?? questionnaire.maxGrade
  const passingGrade =
    attempt?.passingGrade ?? attempt?.questionnaireId?.passingGrade ?? questionnaire.passingGrade
  const maxAllowedGrade =
    attempt?.maxAllowedGrade ?? attempt?.questionnaireId?.maxAllowedGrade ?? questionnaire.maxAllowedGrade

  const scoreOverMaxGrade = attempt?.scoreOverMaxGrade ?? 0
  const scoreOverAllowedGrade = attempt?.scoreOverAllowedGrade ?? 0
  const weightedScore = attempt?.weightedScore ?? 0
  const approvalStatus = attempt?.approvalStatus
  const approvalStatusEs =
    approvalStatus === "Passed" ? "Aprobado" : approvalStatus === "Failed" ? "Reprobado" : "—"

  const totalQuestions = attempt?.totalQuestions ?? 0
  const correctAnswers = attempt?.correctAnswers ?? 0

  // Fechas para controlar disponibilidad
  const now = new Date()
  const openDate = new Date(questionnaire.openDate)
  const deadline = new Date(questionnaire.deadline)

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans mt-8">
      <BackButton className="mb-4" text="Ir a cursos" />

      <div className="bg-gray-50 dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
          {questionnaire.title} - {questionnaire.courseId.name}
        </h2>
        <hr className="my-2" />

        <p className="text-sm text-gray-600 dark:text-gray-400">
          <strong>Apertura:</strong> {fmtDateTime(questionnaire.openDate)}
        </p>
        <p className="text-sm mb-4">
          <strong>Cierre:</strong> {fmtDateTime(questionnaire.deadline)}
        </p>

        <p className="text-sm mb-4">
          <strong>Nota máxima (global):</strong> {maxGrade} |{" "}
          <strong> Nota máxima permitida:</strong> {maxAllowedGrade} |{" "}
          <strong> Nota aprobatoria:</strong> {passingGrade}
        </p>

        <p className="text-sm mb-4 text-gray-600 dark:text-gray-400">{questionnaire.description}</p>

        {attempt ? (
          // Ya existe intento → mostrar resultados
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Su calificación final en este cuestionario es{" "}
              {nf2.format(scoreOverAllowedGrade)}/{nf2.format(maxAllowedGrade)}.
            </h3>

            <table className="w-full text-sm border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm">
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-2 font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 w-1/3">Estado</td>
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-200">Finalizado</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">Completado</td>
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                    {attempt.completionDate ? fmtDateTime(attempt.completionDate) : "—"}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">Puntos</td>
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                    {nf2.format(correctAnswers)} / {nf2.format(totalQuestions)}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">Calificación</td>
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                    {nf2.format(scoreOverAllowedGrade)} de {nf2.format(maxAllowedGrade)}
                  </td>
                </tr>
              </tbody>
            </table>

            <h4 className="text-md font-semibold text-gray-800 dark:text-gray-100">Detalle del resultado</h4>
            <table className="w-full text-sm border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm">
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-2 font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 w-1/3">Nota máxima (global)</td>
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                    {nf2.format(scoreOverMaxGrade)} / {nf2.format(maxGrade)}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">Nota (sobre máximo permitido)</td>
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                    {nf2.format(scoreOverAllowedGrade)} / {nf2.format(maxAllowedGrade)}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">Nota final ponderada (sobre 100)</td>
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{nf2.format(weightedScore)}</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">Nota aprobatoria</td>
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{nf2.format(passingGrade)}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">Resultado</td>
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{approvalStatusEs}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          // No hay intento → validar fechas y mostrar botón según si hay respuestas guardadas
          <>
            {now < openDate && (
              <p className="text-red-600 dark:text-red-400 font-semibold">
                El cuestionario aún no está disponible (abre el {fmtDateTime(openDate)})
              </p>
            )}

            {now > deadline && (
              <p className="text-red-600 dark:text-red-400 font-semibold">
                El cuestionario ha vencido y ya no acepta respuestas (cerró el {fmtDateTime(deadline)})
              </p>
            )}

            {now >= openDate && now <= deadline && (
              <>
                {hasSavedAnswers ? (
                  <button
                    onClick={() =>
                      navigate(`/main/questionnaire/${questionnaire._id}`, {
                        state: { questionnaire },
                      })
                    }
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded"
                  >
                    Continuar cuestionario
                  </button>
                ) : (
                  <button
                    onClick={() => setShowConfirm(true)}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                  >
                    Resolver cuestionario
                  </button>
                )}
              </>
            )}
          </>
        )}
      </div>

      <Modal
        isOpen={showConfirm}
        onRequestClose={() => setShowConfirm(false)}
        contentLabel="Confirmar inicio"
        className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg max-w-md w-full"
        overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center"
      >
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">¿Seguro que deseas iniciar este cuestionario?</h3>
        <div className="flex justify-end gap-4">
          <button
            onClick={() => setShowConfirm(false)}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
          <button onClick={handleStart} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
            Sí, iniciar
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default ActivityDetail
