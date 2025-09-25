import axios from "axios"
import { getLoadingSetter } from "../shared/context/LoadingContext"

const apiClient = axios.create(
  {
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
  }
)

apiClient.interceptors.request.use((config) => {
  const setLoading = getLoadingSetter()
  if (setLoading) setLoading(true)
  return config
})

apiClient.interceptors.response.use(
  (response) => {
    const setLoading = getLoadingSetter()
    if (setLoading) setLoading(false)
    return response
  },
  (error) => {
    const setLoading = getLoadingSetter()
    if (setLoading) setLoading(false)
      
    const isOn503Page = window.location.pathname === "/service-unavailable";
    const isOn429Page = window.location.pathname === "/too-many-requests";

    //console.log(error?.response?.status);

    if (!error.response) {
      if (!isOn503Page) {
        localStorage.setItem("lastRoute", window.location.pathname);
        window.location.href = "/service-unavailable";
      }
    } else {
      const status = error.response.status;

      if (status === 503 && !isOn503Page) {
        localStorage.setItem("lastRoute", window.location.pathname);
        window.location.href = "/service-unavailable";
      }
      if (status === 429 && !isOn429Page) {
        localStorage.setItem("lastRoute", window.location.pathname);
        window.location.href = "/too-many-requests";
      }
    }


    return Promise.reject(error)
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