import { useState, useEffect } from "react"
import { getStudentAttemptForQuestionnaireRequest } from "../../../services/apiQuestionnaire"
import toast from "react-hot-toast"

export const useStudentAttempt = (questionnaireId) => {
  const [attempt, setAttempt] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchAttempt = async () => {
      setLoading(true)
      setError("")
      try {
        const response = await getStudentAttemptForQuestionnaireRequest(questionnaireId)

        if (response?.error) {
          if (response.status === 404 || response.status === 204) {
            setAttempt(null)
            return
          }
          throw new Error(response.message || "Error desconocido")
        }

        setAttempt(response.attempt || null)
      } catch (err) {
        setError(err.message)
        toast.error(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (questionnaireId) fetchAttempt()
  }, [questionnaireId])

  return { attempt, loading, error }
}
