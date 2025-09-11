import { useState, useEffect } from "react"
import { getStudentCoursesRequest } from '../../../services/apiCourse'
import toast from "react-hot-toast"

export const useStudentCourses = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchCourses = async () => {
    setLoading(true)
    setError("")

    const response = await getStudentCoursesRequest()
    setLoading(false)

    if (response.error) {
      const errorMessage = Array.isArray(response.message)
        ? response.message[0]?.msg || "Error desconocido"
        : response.message || "Error desconocido"
      toast.error(errorMessage)
      setError(errorMessage)
      setCourses([])
    } else {
      setCourses(response.data || [])
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  return { courses, loading, error, refetch: fetchCourses }
}
