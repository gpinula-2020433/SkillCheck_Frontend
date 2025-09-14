import apiClient from "./api"

// Obtener todas las competencias
export const getAllCompetencesRequest = async (params = {}) => {
  try {
    const res = await apiClient.get("/v1/competences/allCompetences", {
      params,
      withCredentials: true,
    })
    return res.data
  } catch (err) {
    return {
      error: true,
      message: err.response?.data?.message || "Error al obtener competencias",
      status: err.response?.status || 500,
      details: err.response?.data || null,
    }
  }
}

// Obtener competencia por ID
export const getCompetenceByIdRequest = async (id) => {
  try {
    const res = await apiClient.get(`/v1/competences/competenceById/${id}`, {
      withCredentials: true,
    })
    return res.data
  } catch (err) {
    return {
      error: true,
      message: err.response?.data?.message || "Error al obtener competencia",
      status: err.response?.status || 500,
      details: err.response?.data || null,
    }
  }
}

// Obtener competencias por curso
export const getCompetencesByCourseRequest = async (courseId) => {
  try {
    const res = await apiClient.get(`/v1/competences/competenceByCourse/${courseId}`, {
      withCredentials: true,
    })
    return res.data
  } catch (err) {
    return {
      error: true,
      message: err.response?.data?.message || "Error al obtener competencias por curso",
      status: err.response?.status || 500,
      details: err.response?.data || null,
    }
  }
}