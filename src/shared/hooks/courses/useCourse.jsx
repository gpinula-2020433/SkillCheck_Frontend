import { useState, useEffect } from "react"
import { getAllCoursesRequest } from "../../../services/apiCourse"
import toast from "react-hot-toast"

export const useCourses = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchCourses = async () => {
    setLoading(true)
    setError("")
    const response = await getAllCoursesRequest()
    setLoading(false)

    if (response.error) {
      const errorMessage = response.message || "Error desconocido"
      toast.error(errorMessage)
      setError(errorMessage)
      setCourses([])
    } else {
      setCourses(response.courses || []) // 👈 aquí el fix
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  return { courses, loading, error, refetch: fetchCourses }
}
