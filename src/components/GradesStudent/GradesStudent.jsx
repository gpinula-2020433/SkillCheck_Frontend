import React from "react";

const GradesStudent = () => {
  // Ejemplo de datos, luego los traerás de tu backend/MongoDB
  const grades = [
    {
      id: 1,
      username: "gpinula",
      examName: "Examen de matemáticas",
      subject: "Matemáticas",
      totalQuestions: 5,
      correct: 3,
      wrong: 2,
      percentage: 0.2,
    },
    {
      id: 2,
      username: "gpinula",
      examName: "Examen de ciencia",
      subject: "Ciencia",
      totalQuestions: 5,
      correct: 5,
      wrong: 0,
      percentage: 1,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 font-sans mt-8">
      <h1 className="text-2xl font-bold mb-4">Calificaciones</h1>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full text-left border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 font-semibold text-gray-700">Nombre de usuario</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Nombre del Examen</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Materia</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Total de preguntas</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Preguntas Buenas</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Preguntas Malas</th>
              <th className="px-6 py-3 font-semibold text-gray-700">Porcentaje</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((grade) => (
              <tr key={grade.id} className="border-t">
                <td className="px-6 py-3">{grade.username}</td>
                <td className="px-6 py-3">{grade.examName}</td>
                <td className="px-6 py-3">{grade.subject}</td>
                <td className="px-6 py-3">{grade.totalQuestions}</td>
                <td className="px-6 py-3">{grade.correct}</td>
                <td className="px-6 py-3">{grade.wrong}</td>
                <td className="px-6 py-3">{(grade.percentage * 100).toFixed(0)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default GradesStudent