import { useState, useEffect } from "react"
import { getQuestionnairesForStudentRequest } from '../../../services/apiQuestionnaire'
import toast from "react-hot-toast"

export const useStudentQuestionnaires = (filters = {}) => {
  const [questionnaires, setQuestionnaires] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchQuestionnaires = async () => {
    setLoading(true)
    setError("")

    const response = await getQuestionnairesForStudentRequest(filters)
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
      //toast.success(response.message)
    }
  }

  useEffect(() => {
    fetchQuestionnaires()
  }, [])

  return { questionnaires, loading, error, refetch: fetchQuestionnaires }
}
