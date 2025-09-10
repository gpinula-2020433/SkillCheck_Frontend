import { useState, useEffect } from "react"
import { getQuestionnaireWithQuestionsRequest } from "../../../services/apiQuestionnaire"
import toast from "react-hot-toast"

export const useViewQuestionnaire = (id) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await getQuestionnaireWithQuestionsRequest(id)
      if (res.error) {
        setError(res.message)
        toast.error(res.message)
      } else {
        setData(res.data)
        setError(null)
      }
    } catch (err) {
      setError("Error inesperado al obtener cuestionario")
      toast.error("Error inesperado al obtener cuestionario")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) fetchData()
  }, [id])

  return { data, loading, error, refetch: fetchData }
}
