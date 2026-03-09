import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useCourses } from "../../shared/hooks/courses/useCourse"

const CourseList = () => {
  const navigate = useNavigate()
  const { courses, loading, error } = useCourses()

  const displayError =
    error && !error.includes("No se encontraron cursos") ? error : null

  return (
    <div className="max-w-5xl mx-auto p-6 font-sans mt-8">
      <h1 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">Listar todos los Cursos</h1>
      <Link
        to="/admin/courses/create"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mb-4 inline-block"
      >
        Crear Curso
      </Link>

      {loading && <p className="text-gray-500 dark:text-gray-400">Cargando cursos...</p>}
      {displayError && <p className="text-gray-800 dark:text-gray-200 mb-4">{displayError}</p>}

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full text-left border border-gray-200 dark:border-gray-600">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 font-bold text-gray-800 dark:text-gray-200">Nombre del Curso</th>
              <th className="px-6 py-3 font-bold text-gray-800 dark:text-gray-200">Ver detalles del curso </th>
            </tr>
          </thead>
          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan="2" className="text-center py-4 text-gray-500 dark:text-gray-400">
                  No hay cursos disponibles
                </td>
              </tr>
            ) : (
              courses.map((course) => (
                <tr key={course._id} className="border-t dark:border-gray-600">
                  <td className="px-6 py-3 text-gray-800 dark:text-gray-200">{course.name}</td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => navigate(`/admin/questionnaire/details/${course._id}`)}
                      className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 px-3 py-1 rounded"
                    >
                      inspeccionar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CourseList