import React, { useState } from "react"
import { useQuestions } from '../../shared/hooks/questionnaire/useQuestions'
import { useLocation, useNavigate } from "react-router-dom"
import Modal from "react-modal"

export const Questionnaire = () => {
  const location = useLocation()
  const { questionnaire } = location.state || {}
  const { 
    questions, loading, currentIndex, setAnswer, nextQuestion, prevQuestion, submitAllAnswers, answers
  } = useQuestions(questionnaire?._id)
  const navigate = useNavigate()

  const [showConfirm, setShowConfirm] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  if (!questionnaire) return <p>Cuestionario no encontrado</p>
  if (loading) return <p>Cargando preguntas...</p>
  if (questions.length === 0) return <p>No hay preguntas para este cuestionario</p>

  const currentQuestion = questions[currentIndex]
  const currentAnswer = answers.find(a => a.questionId === currentQuestion._id) || {}

  const handleSubmit = async () => {
    setSubmitting(true)  
    try {
      const response = await submitAllAnswers()
      if (!response.error) {
        navigate(`/main/activity/${questionnaire._id}`, { state: { questionnaire } })
      }
    } catch (err) {
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8">
      <h2 className="text-xl font-semibold mb-4">{questionnaire.title} - {questionnaire.courseId.name}</h2>
      <p className="mb-2">
        Abre: {new Date(questionnaire.openDate).toLocaleDateString()} | 
        Cierra: {new Date(questionnaire.deadline).toLocaleDateString()}
      </p>

      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md mb-4">
        <p className="mb-2">{currentIndex + 1}. {currentQuestion.statement}</p>

        {currentQuestion.type === "CHOICE" ? (
          currentQuestion.options.map(opt => {
            const selected = currentAnswer.selectedOptionId === opt._id
            return (
              <div key={opt._id} className="mb-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={currentQuestion._id}
                    checked={selected || false}
                    onChange={() => setAnswer(currentQuestion._id, "CHOICE", opt._id)}
                  />
                  {opt.text}
                </label>
              </div>
            )
          })
        ) : (
          <textarea
            className="w-full p-2 border rounded"
            rows={4}
            value={currentAnswer.answerText || ""}
            onChange={(e) => setAnswer(currentQuestion._id, "OPEN", null, e.target.value)}
          />
        )}
      </div>

      <div className="flex justify-between">
        <button 
          onClick={prevQuestion} 
          disabled={currentIndex === 0}
          className="bg-gray-400 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Anterior
        </button>

        {currentIndex < questions.length - 1 ? (
          <button 
            onClick={nextQuestion} 
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Siguiente
          </button>
        ) : (
          <button 
            onClick={() => setShowConfirm(true)} 
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Terminar
          </button>
        )}
      </div>

      <Modal
        isOpen={showConfirm}
        onRequestClose={() => setShowConfirm(false)}
        contentLabel="Confirmar envío"
        className="bg-white p-6 rounded shadow-lg max-w-md w-full"
        overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center"
      >
        <h3 className="text-lg font-semibold mb-4">¿Deseas enviar tus respuestas y finalizar el cuestionario?</h3>
        <div className="flex justify-end gap-4">
          <button 
            onClick={() => setShowConfirm(false)}
            className="bg-gray-400 text-white px-4 py-2 rounded"
            disabled={submitting}
          >
            Cancelar
          </button>
          <button 
            onClick={handleSubmit}
            className={`bg-green-500 text-white px-4 py-2 rounded ${submitting ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={submitting}
          >
            {submitting ? "Enviando..." : "Sí, enviar"}
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default Questionnaire
