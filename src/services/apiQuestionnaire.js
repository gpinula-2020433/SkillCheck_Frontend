import apiClient from './api'

export const getQuestionnairesForStudentRequest = async (filters = {}) => {
  try {
    const res = await apiClient.get("/v1/questionnaire/getQuestionnairesForStudent", {
      params: filters,
      withCredentials: true
    })
    return res.data
  } catch (err) {
    return {
      error: true,
      message: err.response?.data?.message || "Error al obtener cuestionarios",
      status: err.response?.status || 500,
      details: err.response?.data || null
    }
  }
}

export const getStudentAttemptForQuestionnaireRequest = async (id) => {
  try {
    const res = await apiClient.get(`/v1/questionnaire/getStudentAttemptForQuestionnaire/${id}`, {
      withCredentials: true
    })
    return res.data
  } catch (err) {
    return {
      error: true,
      message: err.response?.data?.message || "Error al obtener intento del cuestionario",
      status: err.response?.status || 500,
      details: err.response?.data || null
    }
  }
}

export const getQuestionsForStudentRequest = async (questionnaireId) => {
  try {
    const res = await apiClient.get(`/v1/question/getQuestionsForStudent/${questionnaireId}`)
    return res.data
  } catch (err) {
    return {
      error: true,
      message: err.response?.data?.message || "Error al obtener preguntas",
      status: err.response?.status || 500,
      details: err.response?.data || null
    }
  }
}

export const submitAnswersRequest = async (answers) => {
  try {
    const res = await apiClient.post('/v1/studentAnswer/submitAnswers', { answers })
    return res.data
  } catch (err) {
    return {
      error: true,
      message: err.response?.data?.message || "Error al enviar respuestas",
      status: err.response?.status || 500,
      details: err.response?.data || null
    }
  }
}

export const getAllQuestionnairesRequest = async (params = {}) => {
  try {
    const res = await apiClient.get("/v1/questionnaire/getAllQuestionnaires", {
      params,
      withCredentials: true,
    })
    return res.data
  } catch (err) {
    return {
      error: true,
      message: err.response?.data?.message || "Error al obtener cuestionarios",
      status: err.response?.status || 500,
      details: err.response?.data || null,
    }
  }
}


export const getQuestionnaireResultsRequest = async (questionnaireId) => {
  try {
    const res = await apiClient.post(
      "/v1/questionnaire/getQuestionnaireResults",
      { questionnaireId }
    )
    return res.data
  } catch (err) {
    return {
      error: true,
      message: err.response?.data?.message || "Error al obtener resultados",
      status: err.response?.status || 500,
      details: err.response?.data || null,
    }
  }
}

export const getQuestionnaireWithQuestionsRequest = async (id) => {
  try {
    const res = await apiClient.get(`/v1/questionnaire/getQuestionnaireWithQuestions/${id}`)
    return res.data
  } catch (err) {
    return {
      error: true,
      message: err.response?.data?.message || "Error al obtener cuestionario con preguntas",
      status: err.response?.status || 500,
      details: err.response?.data || null,
    }
  }
}

export const createQuestionnaireRequest = async (data) => {
  try {
    const res = await apiClient.post("/v1/questionnaire/createQuestionnaireWithQuestions", data)
    return res.data
  } catch (err) {
    return {
      error: true,
      message: err.response?.data?.message || "Error al crear el cuestionario",
      status: err.response?.status || 500,
      details: err.response?.data || null,
    }
  }
}