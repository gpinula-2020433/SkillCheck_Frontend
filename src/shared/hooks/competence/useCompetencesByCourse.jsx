import { useState, useEffect } from "react"
import { getCompetencesByCourseRequest } from "../../../services/apiCompetence"

export const useCompetencesByCourse = (courseId) => {
  const [competences, setCompetences] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!courseId) {
      setLoading(false)
      setError("El ID del curso es requerido")
      return
    }

    const fetchCompetences = async () => {
      setLoading(true)
      try {
        const res = await getCompetencesByCourseRequest(courseId)

        if (res.error) {
          setError(res.message)
          setCompetences([])
        } else {
          setCompetences(res.competences) // <-- aquí usa competences
          setError(null)
        }
      } catch (err) {
        setError("Error inesperado al obtener las competencias")
        setCompetences([])
      } finally {
        setLoading(false)
      }
    }

    fetchCompetences()
  }, [courseId])

  return { competences, loading, error }
}