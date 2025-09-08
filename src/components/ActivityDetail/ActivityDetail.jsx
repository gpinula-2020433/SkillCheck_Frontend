import React, { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Modal from "react-modal"

const ActivityDetail = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { questionnaire } = location.state || {}
  const [showConfirm, setShowConfirm] = useState(false)

  if (!questionnaire) return <p>Cuestionario no encontrado</p>

  const handleStart = () => {
    setShowConfirm(false)
    navigate(`/main/questionnaire/${questionnaire._id}`, { state: { questionnaire } })
  }

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans mt-8">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-500 hover:underline mb-4"
      >
        ← Regresar al curso
      </button>

      <div className="bg-gray-50 shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">{questionnaire.title} - {questionnaire.courseId.name}</h2>
        <hr className="my-2" />

        <p className="text-sm">
          <strong>Abrió:</strong> {new Date(questionnaire.openDate).toLocaleDateString()}
        </p>
        <p className="text-sm mb-4">
          <strong>Cierra:</strong> {new Date(questionnaire.deadline).toLocaleDateString()}
        </p>

        <p className="text-sm mb-4">
          <strong>Nota máxima:</strong> {questionnaire.maxGrade} | 
          <strong> Nota máxima permitida:</strong> {questionnaire.maxAllowedGrade} | 
          <strong> Nota aprobatoria:</strong> {questionnaire.passingGrade}
        </p>
        <p className="text-sm mb-4">{questionnaire.description}</p>

        <button
          onClick={() => setShowConfirm(true)}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
        >
          Resolver cuestionario
        </button>
      </div>

      <Modal
        isOpen={showConfirm}
        onRequestClose={() => setShowConfirm(false)}
        contentLabel="Confirmar inicio"
        className="bg-white p-6 rounded shadow-lg max-w-md w-full"
        overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center"
      >
        <h3 className="text-lg font-semibold mb-4">
          ¿Seguro que deseas iniciar este cuestionario?
        </h3>
        <div className="flex justify-end gap-4">
          <button 
            onClick={() => setShowConfirm(false)}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
          <button 
            onClick={handleStart}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Sí, iniciar
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default ActivityDetail
