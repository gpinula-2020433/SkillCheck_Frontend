import { useState } from 'react'
import { createTeacherRequest } from '../../../services/api'

export const useRegisterTeacher = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const registerTeacher = async (formData) => {
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      const res = await createTeacherRequest(formData)
      if (res.error) {
        setError(res.message)
      } else {
        setSuccess(res.message || 'Profesor registrado correctamente')
      }
      return res
    } catch (err) {
      const unexpectedError = { error: true, message: 'Error inesperado al registrar profes@r' }
      setError(unexpectedError.message)
      return unexpectedError
    } finally {
      setLoading(false)
    }
  }

  return { registerTeacher, loading, error, success }
}