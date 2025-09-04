import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CourseList = () => {
  const navigate = useNavigate()
  // Datos de ejemplo
  const courses = [
    { id: 1, name: "Examen de matemáticas" },
    { id: 2, name: "Examen de ciencia" },
    { id: 3, name: "Examen de historia" },
    { id: 4, name: "Examen de inglés" },
    { id: 5, name: "Examen de psicología" },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 font-sans mt-8">
      <h1 className="text-2xl font-bold mb-2">Listar todos los Cursos</h1>
      <Link to='/admin/courses/create' className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mb-4">
        Crear Curso
      </Link>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full text-left border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 font-bold text-gray-800">
                Nombre del Curso
              </th>
              <th className="px-6 py-3 font-bold text-gray-800">
                Agregar Cuestionario
              </th>
              <th className="px-6 py-3 font-bold text-gray-800">
                Listar Cuestionarios
              </th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="border-t">
                <td className="px-6 py-3">{course.name}</td>
                <td className="px-6 py-3">
                  <button 
                    onClick={() => navigate(`/admin/questionnaire/create`)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded">
                    agregar
                  </button>
                </td>
                <td className="px-6 py-3">
                  <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded">
                    ver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CourseList