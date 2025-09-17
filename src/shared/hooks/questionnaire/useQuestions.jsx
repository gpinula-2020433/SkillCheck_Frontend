import { useState, useEffect } from "react"
import { getQuestionsForStudentRequest, submitAnswersRequest } from "../../../services/apiQuestionnaire"
import toast from "react-hot-toast"

export const useQuestions = (questionnaireId) => {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [error, setError] = useState("")

  const storageKey = `answers_${questionnaireId}`

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true)
      setError("")
      try {
        const response = await getQuestionsForStudentRequest(questionnaireId)
        if (response.error) {
          throw new Error(
            Array.isArray(response.message)
              ? response.message[0]?.msg || "Error desconocido"
              : response.message || "Error desconocido"
          )
        }

        setQuestions(response.questions)

        const savedData = localStorage.getItem(storageKey)
        if (savedData) {
          const parsed = JSON.parse(savedData)
          setAnswers(parsed.answers || [])
          setCurrentIndex(parsed.currentIndex || 0)
        } else {
          const initialAnswers = response.questions.map(q => ({
            questionnaireId,
            questionId: q._id,
            type: q.type,
            selectedOptionId: null,
            answerText: ""
          }))
          setAnswers(initialAnswers)
        }
      } catch (err) {
        setError(err.message)
        toast.error(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (questionnaireId) fetchQuestions()
  }, [questionnaireId])

  useEffect(() => {
    if (answers.length > 0) {
      localStorage.setItem(storageKey, JSON.stringify({
        answers,
        currentIndex
      }))
    }
  }, [answers, currentIndex, storageKey])

  const setAnswer = (questionId, type, selectedOptionId = null, answerText = "") => {
    setAnswers(prev =>
      prev.map(a =>
        a.questionId === questionId
          ? { ...a, type, selectedOptionId, answerText, questionnaireId }
          : a
      )
    )
  }

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1)
    }
  }

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
    }
  }

  const submitAllAnswers = async () => {
    setError("")
    try {
      const payload = answers.map(a => ({
        ...a,
        questionnaireId
      }))

      const response = await submitAnswersRequest(payload)
      if (response.error) {
        throw new Error(
          Array.isArray(response.message)
            ? response.message[0]?.msg || "Error desconocido"
            : response.message || "Error desconocido"
        )
      }

      localStorage.removeItem(storageKey)

      toast.success(response.message || "Respuestas enviadas correctamente")
      return response
    } catch (err) {
      setError(err.message)
      toast.error(err.message)
      return { error: true, message: err.message }
    }
  }

  return {
    questions,
    loading,
    currentIndex,
    setAnswer,
    nextQuestion,
    prevQuestion,
    submitAllAnswers,
    answers,
    error
  }
}
