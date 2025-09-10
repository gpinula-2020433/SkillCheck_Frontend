import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useCourses } from "../../shared/hooks/courses/useCourse"

const CourseList = () => {
  const navigate = useNavigate()
  const { courses, loading, error } = useCourses()

  return (
    <div className="max-w-5xl mx-auto p-6 font-sans mt-8">
      <h1 className="text-2xl font-bold mb-2">Listar todos los Cursos</h1>
      <Link
        to="/admin/courses/create"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mb-4 inline-block"
      >
        Crear Curso
      </Link>

      {loading && <p className="text-gray-500">Cargando cursos...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full text-left border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 font-bold text-gray-800">Nombre del Curso</th>
              <th className="px-6 py-3 font-bold text-gray-800">Agregar Cuestionario</th>
              <th className="px-6 py-3 font-bold text-gray-800">Listar Cuestionarios</th>
              <th className="px-6 py-3 font-bold text-gray-800">Ver detalles del curso </th>
            </tr>
          </thead>
          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  No hay cursos disponibles
                </td>
              </tr>
            ) : (
              courses.map((course) => (
                <tr key={course._id} className="border-t">
                  <td className="px-6 py-3">{course.name}</td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => navigate(`/admin/questionnaire/create?courseId=${course._id}`)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded"
                    >
                      agregar
                    </button>
                  </td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => navigate(`/admin/questionnaire/list/${course._id}`)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded"
                    >
                      ver
                    </button>
                  </td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => navigate(`/admin/questionnaire/details/${course._id}`)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded"
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
