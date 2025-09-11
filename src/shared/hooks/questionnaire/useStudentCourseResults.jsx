import { useState, useEffect } from "react"
import { getStudentCourseResultsRequest } from '../../../services/apiQuestionnaire'
import toast from "react-hot-toast"

export const useStudentCourseResults = (courseId) => {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchResults = async () => {
    if (!courseId) return
    setLoading(true)
    setError("")

    const response = await getStudentCourseResultsRequest(courseId)
    setLoading(false)

    if (response.error) {
      toast.error(response.message)
      setError(response.message)
      setResults(null)
    } else {
      setResults(response)
    }
  }

  useEffect(() => {
    fetchResults()
  }, [courseId])

  return { results, loading, error, refetch: fetchResults }
}
