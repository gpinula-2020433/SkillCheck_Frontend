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


export const createCourseRequest = async (formData) => {
  try {
    const res = await apiClient.post('/v1/course/addCourse', formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    return res.data
  } catch (err) {
    return {
      error: true,
      message: err.response?.data?.message || "Error al crear curso",
      status: err.response?.status || 500,
      details: err.response?.data || null
    }
  }
}

export const getStudentCoursesRequest = async () => {
  try {
    const res = await apiClient.get("/v1/questionnaire/getStudentCourses", { withCredentials: true })
    return res.data
  } catch (err) {
    return {
      error: true,
      message: err.response?.data?.message || "Error al obtener materias",
      status: err.response?.status || 500,
      details: err.response?.data || null
    }
  }
}


export const assignStudentToCourseRequest = async (studentId, courseId) => {
  try {
    const res = await apiClient.post(
      "/v1/studentCourse/addStudentCourse",
      { student: studentId, course: courseId },
      { withCredentials: true }
    )
    return res.data
  } catch (err) {
    return {
      error: true,
      message: err.response?.data?.message || "Error al asignar estudiante",
      status: err.response?.status || 500,
      details: err.response?.data || null,
    }
  }
}