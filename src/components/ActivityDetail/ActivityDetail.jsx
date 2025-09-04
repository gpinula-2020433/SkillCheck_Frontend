import React from "react";
import { useNavigate } from "react-router-dom"

const ActivityDetail = () => {
  const navigate = useNavigate();

  // Datos de ejemplo
  const activity = {
    title: "Actividad ejemplo matemática",
    openDate: "19/08/2025",
    closeDate: "24/08/2025",
    instructions: "Siga indicaciones del profesor.",
    timeLimit: "1 hora",
  };

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans mt-8">
      {/* Botón para regresar */}
      <button
        onClick={() => navigate(-1)}
        className="text-blue-500 hover:underline mb-4"
      >
        ← Regresar al curso
      </button>

      <div className="bg-gray-50 shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">{activity.title}</h2>
        <hr className="my-2" />

        <p className="text-sm">
          <strong>Abrió:</strong> {activity.openDate}
        </p>
        <p className="text-sm mb-4">
          <strong>Cierra:</strong> {activity.closeDate}
        </p>

        {/* Botón para resolver */}
        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mb-4">
          Resolver cuestionario
        </button>

        <p className="text-sm">{activity.instructions}</p>
        <p className="text-sm">
          <strong>Límite de tiempo:</strong> {activity.timeLimit}
        </p>
      </div>
    </div>
  )
}

export default ActivityDetail