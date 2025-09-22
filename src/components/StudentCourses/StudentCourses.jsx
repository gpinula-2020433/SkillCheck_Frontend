import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllCoursesRequest } from "../../services/apiCourse"

const StudentCourses = () => {
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true)
      const res = await getAllCoursesRequest()
      if (!res.error) {
        setCourses(res.courses || [])
      } else {
        setError(res.message)
      }
      setLoading(false)
    }

    fetchCourses()
  }, [])

  return (
    <div className="max-w-6xl mx-auto p-6 font-sans mt-8">
      <h1 className="text-2xl font-bold mb-1">Cursos</h1>
      <p className="text-gray-600 mb-6">Vista general de cursos</p>

      {loading && <p className="text-gray-500">Cargando cursos...</p>}

      {error && error.includes("No se encontraron cursos") ? (
        <p className="text-black">No tiene cursos asignados</p>
      ) : (
        error && <p className="text-red-500">{error}</p>
      )}

      {!loading && !error && (
        <>
          {courses.length === 0 ? (
            <p className="text-black">No tiene cursos asignados</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white shadow-md rounded-lg overflow-hidden text-center p-4"
                >
                  <h2 className="text-lg font-bold mb-3">{course.name}</h2>

                  <img
                    src={
                      course.imageCourse
                        ? `${import.meta.env.VITE_API_URL}/uploads/img/courses/${course.imageCourse}`
                        : "/placeholder.png"
                    }
                    alt={course.name}
                    className="w-full h-32 object-cover rounded-md mb-3"
                  />

                  <button
                    onClick={() =>
                      navigate(`/main/course/${course._id}`, {
                        state: { course },
                      })
                    }
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded"
                  >
                    Ver detalles
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default StudentCourses