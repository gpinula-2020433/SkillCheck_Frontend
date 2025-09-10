import apiClient from "./api"

export const getAllCoursesRequest = async () => {
  try {
    const res = await apiClient.get('/v1/course/allCourses', {
      withCredentials: true
    })
    return res.data
  } catch (err) {
    return {
      error: true,
      message: err.response?.data?.message || "Error al obtener cursos",
      status: err.response?.status || 500,
      details: err.response?.data || null
    }
  }
}