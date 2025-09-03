import React from "react";

const StudentCourses = () => {
  // Datos de ejemplo (se reemplazarán con los del backend/MongoDB)
  const studentCourses = [
    { id: 1, name: "Matemática", image: "https://cursos.aiu.edu/images/matematica.jpg" },
    { id: 2, name: "Ciencia", image: "https://sdcoopsemulweb.s3.amazonaws.com/imagenesCursos/rGcYp7pqMxvwFuw8iuQJEmG2boRSNOkqB8UQSa2m.jpg" },
    { id: 3, name: "Historia", image: "https://img.freepik.com/vetores-premium/linha-do-doodle-da-historia-definir-o-assunto-do-esboco-da-universidade-da-escola_399998-67.jpg" },
    { id: 4, name: "Inglés", image: "https://cdn.euroinnova.edu.es/img/subidasEditor/cursos-de-idiomas-ingles-1584011024.webp" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 font-sans mt-8">
      <h1 className="text-2xl font-bold mb-1">Cursos</h1>
      <p className="text-gray-600 mb-6">Vista general de curso</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {studentCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white shadow-md rounded-lg overflow-hidden text-center p-4"
          >
            <h2 className="text-lg font-bold mb-3">{course.name}</h2>
            <img
              src={course.image}
              alt={course.name}
              className="w-full h-32 object-cover rounded-md mb-3"
            />
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded">
              Ver cuestionarios
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StudentCourses