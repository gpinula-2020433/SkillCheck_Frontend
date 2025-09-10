import { useState, useEffect } from "react"
import { getAllQuestionnairesRequest } from "../../../services/apiQuestionnaire"
import toast from "react-hot-toast"

export const useCourseQuestionnaires = (courseId, options = {}) => {
  const [questionnaires, setQuestionnaires] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchQuestionnaires = async () => {
    setLoading(true)
    setError("")

    const response = await getAllQuestionnairesRequest({ courseId, ...options })
    setLoading(false)

    if (response.error) {
      const errorMessage = Array.isArray(response.message)
        ? response.message[0]?.msg || "Error desconocido"
        : response.message || "Error desconocido"
      toast.error(errorMessage)
      setError(errorMessage)
      setQuestionnaires([])
    } else {
      setQuestionnaires(response.data || [])
    }
  }

  useEffect(() => {
    if (courseId) {
      fetchQuestionnaires()
    }
  }, [courseId])

  return { questionnaires, loading, error, refetch: fetchQuestionnaires }
}
