import { useState } from 'react'
import axios from 'axios'

export const useTest = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  const test = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/test`, { withCredentials: true })
      setMessage(response.data.message)
    } catch (err) {
      setError('Error al realizar la prueba. Asegúrate de que la cookie esté presente.')
    } finally {
      setLoading(false)
    }
  }

  return { test, loading, error, message }
}
