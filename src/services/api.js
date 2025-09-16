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

export const logoutRequest = async () => {
  try {
    const res = await apiClient.post('/logout')
    return res.data
  } catch (err) {
    return {
      error: true,
      message: err.response?.data?.message || 'Error al realizar el logout',
      status: err.response?.status || 500,
      details: err.response?.data || null
    }
  }
}

export const getAuthenticatedUserRequest = async () => {
  try {
    const res = await apiClient.get('/v1/user/getAuthenticatedUser')
    return res.data
  } catch (err) {
    return {
      error: true,
      message: err.response?.data?.message || 'Error al obtener usuario autenticado',
      status: err.response?.status || 500,
      details: err.response?.data || null
    }
  }
}

export const createStudentRequest = async (data) => {
  try {
    const res = await apiClient.post('/register/student', data)
    return res.data
  } catch (err) {
    return {
      error: true,
      message: err.response?.data?.message || "Error al registrar estudiante",
      status: err.response?.status || 500,
      details: err.response?.data || null,
    }
  }
}

export const createTeacherRequest = async (data) => {
  try {
    const res = await apiClient.post('/register/teacher', data)
    return res.data
  } catch (err) {
    return {
      error: true,
      message: err.response?.data?.message || "Error al registrar estudiante",
      status: err.response?.status || 500,
      details: err.response?.data || null,
    }
  }
}

export default apiClient