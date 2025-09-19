import { useState, useEffect } from "react"
import { getAllQuestionnairesRequest } from "../../../services/apiQuestionnaire"
import toast from "react-hot-toast"

export const useCourseQuestionnaires = (courseId, options = {}) => {
  const [questionnaires, setQuestionnaires] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [infoMessage, setInfoMessage] = useState("")

  const fetchQuestionnaires = async () => {
    setLoading(true)
    setError("")
    setInfoMessage("")

    const response = await getAllQuestionnairesRequest({ courseId, ...options })
    setLoading(false)

    if (response.error) {
      const errorMessage = Array.isArray(response.message)
        ? response.message[0]?.msg || "Error desconocido"
        : response.message || "Error desconocido"
      
      if (response.message !== "Este curso no tiene cuestionarios registrados") {
        toast.error(errorMessage)
        setError(errorMessage)
      }
      
      if (response.message === "Este curso no tiene cuestionarios registrados") {
        setInfoMessage("Este curso no tiene cuestionarios registrados")
      }

      setQuestionnaires([])
    } else {
      setQuestionnaires(response.data || [])
      
      if (response.data.length === 0) {
        setInfoMessage("Este curso no tiene cuestionarios registrados")
      }
    }
  }

  useEffect(() => {
    if (courseId) {
      fetchQuestionnaires()
    }
  }, [courseId])

  return { questionnaires, loading, error, infoMessage, refetch: fetchQuestionnaires }
}
