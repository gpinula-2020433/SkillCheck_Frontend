import React from "react"
import { useNavigate } from "react-router-dom"
import { useStudentCourses } from '../../shared/hooks/courses/useStudentCourses'

export const StudentCourses = () => {
  const navigate = useNavigate()
  const { courses, loading } = useStudentCourses()

  if (loading) return <p className="text-center mt-8 text-gray-500 dark:text-gray-400">Cargando materias...</p>

  return (
    <div className="max-w-4xl mx-auto p-5 font-sans mt-8">

      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Cursos asignados</h1>

      {courses.length === 0 ? (
        <p className="text-gray-800 dark:text-gray-200">No estás inscrito en ninguna materia</p>
      ) : (
        <table className="w-full text-sm border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Nombre</th>
              <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Descripción</th>
              <th className="px-4 py-2 text-center text-gray-700 dark:text-gray-300">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course._id} className="border-b dark:border-gray-600">
                <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{course.name}</td>
                <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{course.description}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => navigate(`/main/course-grades-report/${course._id}`)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded"
                  >
                    Ver notas
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default StudentCourses
