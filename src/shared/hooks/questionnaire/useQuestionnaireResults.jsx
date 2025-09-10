import { useState, useEffect } from "react"
import { getQuestionnaireResultsRequest } from "../../../services/apiQuestionnaire"
import toast from "react-hot-toast"

export const useQuestionnaireResults = (questionnaireId) => {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchResults = async () => {
    setLoading(true)
    try {
      const res = await getQuestionnaireResultsRequest(questionnaireId)
      if (res.error) {
        setError(res.message)
        toast.error(res.message)
      } else {
        setResults(res)
        setError(null)
      }
    } catch (err) {
      setError("Error inesperado al obtener resultados")
      toast.error("Error inesperado al obtener resultados")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (questionnaireId) fetchResults()
  }, [questionnaireId])

  return { results, loading, error, refetch: fetchResults }
}
