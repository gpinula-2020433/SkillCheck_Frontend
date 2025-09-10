import { useState } from "react"
import toast from "react-hot-toast"
import { createQuestionnaireRequest } from "../../../services/apiQuestionnaire"

export const useCreateQuestionnaire = () => {
  const [loading, setLoading] = useState(false)

  const createQuestionnaire = async (questionnaireData) => {
    setLoading(true)
    try {
        console.log(questionnaireData)
      const res = await createQuestionnaireRequest(questionnaireData)
      if (res.error) {
        toast.error(res.message)
        return null
      } else {
        toast.success("Cuestionario creado exitosamente")
        return res
      }
    } catch (err) {
      toast.error("Error inesperado al crear el cuestionario")
      return null
    } finally {
      setLoading(false)
    }
  }

  return { loading, createQuestionnaire }
}
