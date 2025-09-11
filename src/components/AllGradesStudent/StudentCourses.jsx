import React from "react"
import { useNavigate } from "react-router-dom"
import { useStudentCourses } from '../../shared/hooks/courses/useStudentCourses'

export const StudentCourses = () => {
  const navigate = useNavigate()
  const { courses, loading } = useStudentCourses()

  if (loading) return <p className="text-center mt-8">Cargando materias...</p>

  return (
    <div className="max-w-4xl mx-auto p-5 font-sans mt-8">

      <h1 className="text-2xl font-bold mb-6">Cursos asignados</h1>

      {courses.length === 0 ? (
        <p>No estás inscrito en ninguna materia</p>
      ) : (
        <table className="w-full text-sm border border-gray-300 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Descripción</th>
              <th className="px-4 py-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course._id} className="border-b">
                <td className="px-4 py-2">{course.name}</td>
                <td className="px-4 py-2">{course.description}</td>
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
