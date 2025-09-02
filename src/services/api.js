import axios from "axios"

const apiClient = axios.create(
  {
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 2000,
    withCredentials: true
  }
)

export const loginRequest = async (userLoginData) => {
  try {
    const res = await apiClient.post('/login', userLoginData, {
      type: 'multipart/form-data'
    })
    return res.data
  } catch (err) {
    return {
      error: true,
      message: err.response?.data?.message || 'Error al realizar el login',
      status: err.response?.status || 500,
      details: err.response?.data || null
    }
  }
}
