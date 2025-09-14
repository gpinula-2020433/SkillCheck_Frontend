import React, { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useCreateQuestionnaire } from "../../shared/hooks/questionnaire/useCreateQuestionnaire"
import { useCompetencesByCourse } from "../../shared/hooks/competence/useCompetencesByCourse"

export const CreateQuestionnaire = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const { loading, createQuestionnaire } = useCreateQuestionnaire()
  const { competences, error } = useCompetencesByCourse(courseId)

  const [questionnaireData, setQuestionnaireData] = useState({
    title: "",
    description: "",
    maxGrade: 100,
    maxAllowedGrade: 100,
    passingGrade: 60,
    openDate: "",
    deadline: "",
    questions: [],
  })

  const addQuestion = () => {
    setQuestionnaireData({
      ...questionnaireData,
      questions: [
        ...questionnaireData.questions,
        {
          statement: "",
          type: "CHOICE",
          competencyId: "",
          points: 0,
          options: [{ text: "", isCorrect: false }],
          correctAnswer: "",
        },
      ],
    })
  }

  const removeQuestion = (index) => {
    const questions = questionnaireData.questions.filter((_, i) => i !== index)
    setQuestionnaireData({ ...questionnaireData, questions })
  }

  const handleQuestionChange = (index, field, value) => {
    const questions = [...questionnaireData.questions]
    questions[index][field] = value
    setQuestionnaireData({ ...questionnaireData, questions })
  }

  const handleOptionChange = (qIndex, oIndex, field, value) => {
    const questions = [...questionnaireData.questions]
    questions[qIndex].options[oIndex][field] =
      field === "isCorrect" ? value : value
    setQuestionnaireData({ ...questionnaireData, questions })
  }

  const addOption = (qIndex) => {
    const questions = [...questionnaireData.questions]
    questions[qIndex].options.push({ text: "", isCorrect: false })
    setQuestionnaireData({ ...questionnaireData, questions })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = { ...questionnaireData, courseId }
    const res = await createQuestionnaire(payload)
    if (res) navigate(`/admin/questionnaire/details/${courseId}`)
  }

  return (
    <div className="max-w-5xl mx-auto p-6 font-sans mt-8">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-500 hover:underline mb-4"
      >
        ← Regresar
      </button>

      <h1 className="text-2xl font-bold mb-4">Crear Cuestionario</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="font-semibold">Título</label>
        <input
          type="text"
          placeholder="Título"
          className="border px-3 py-2 rounded w-full"
          value={questionnaireData.title}
          onChange={(e) =>
            setQuestionnaireData({
              ...questionnaireData,
              title: e.target.value,
            })
          }
          required
        />

        <label className="font-semibold">Descripción</label>
        <textarea
          placeholder="Descripción"
          className="border px-3 py-2 rounded w-full"
          value={questionnaireData.description}
          onChange={(e) =>
            setQuestionnaireData({
              ...questionnaireData,
              description: e.target.value,
            })
          }
          required
        />

        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="font-semibold">Nota máxima</label>
            <input
              type="number"
              placeholder="Campo"
              className="border px-3 py-2 rounded w-full"
              value={questionnaireData.maxGrade}
              onChange={(e) =>
                setQuestionnaireData({
                  ...questionnaireData,
                  maxGrade: +e.target.value,
                })
              }
              required
            />
          </div>
          <div className="flex-1">
            <label className="font-semibold">Nota máxima permitida</label>
            <input
              type="number"
              placeholder="Campo"
              className="border px-3 py-2 rounded w-full"
              value={questionnaireData.maxAllowedGrade}
              onChange={(e) =>
                setQuestionnaireData({
                  ...questionnaireData,
                  maxAllowedGrade: +e.target.value,
                })
              }
              required
            />
          </div>
          <div className="flex-1">
            <label className="font-semibold">Nota aprobatoria</label>
            <input
              type="number"
              placeholder="Campo"
              className="border px-3 py-2 rounded w-full"
              value={questionnaireData.passingGrade}
              onChange={(e) =>
                setQuestionnaireData({
                  ...questionnaireData,
                  passingGrade: +e.target.value,
                })
              }
              required
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="font-semibold">Fecha inicio</label>
            <input
              type="date"
              className="border px-3 py-2 rounded w-full"
              value={questionnaireData.openDate}
              onChange={(e) =>
                setQuestionnaireData({
                  ...questionnaireData,
                  openDate: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="flex-1">
            <label className="font-semibold">Fecha cierre</label>
            <input
              type="date"
              className="border px-3 py-2 rounded w-full"
              value={questionnaireData.deadline}
              onChange={(e) =>
                setQuestionnaireData({
                  ...questionnaireData,
                  deadline: e.target.value,
                })
              }
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="font-semibold text-lg">Preguntas</h2>
          {questionnaireData.questions.map((q, i) => (
            <div
              key={i}
              className="border p-3 rounded space-y-2 bg-gray-50 relative"
            >
              <button
                type="button"
                onClick={() => removeQuestion(i)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold"
              >
                X
              </button>

              <label className="font-semibold">Puntos</label>
              <input
                type="number"
                placeholder="0"
                className="border px-2 py-1 rounded w-full"
                value={q.points || ""}
                onChange={(e) =>
                  handleQuestionChange(i, "points", +e.target.value)
                }
                required
              />

              <label className="font-semibold">Enunciado</label>
              <input
                type="text"
                placeholder="Campo"
                className="border px-2 py-1 rounded w-full"
                value={q.statement}
                onChange={(e) =>
                  handleQuestionChange(i, "statement", e.target.value)
                }
                required
              />

              <label className="font-semibold">Tipo de pregunta</label>
              <select
                className="border px-2 py-1 rounded w-full"
                value={q.type}
                onChange={(e) => handleQuestionChange(i, "type", e.target.value)}
              >
                <option value="CHOICE">Selección múltiple</option>
                <option value="OPEN">Respuesta abierta</option>
              </select>

              <label className="font-semibold">Competencia</label>
              <select
                className="border px-2 py-1 rounded w-full"
                value={q.competencyId}
                onChange={(e) =>
                  handleQuestionChange(i, "competencyId", e.target.value)
                }
                required
              >
                <option value="">-- Selecciona una competencia --</option>
                {competences.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.competenceName}
                  </option>
                ))}
              </select>

              {q.type === "CHOICE" && (
                <div className="space-y-1">
                  <h3 className="font-semibold">Opciones</h3>
                  {q.options.map((opt, j) => (
                    <div key={j} className="flex space-x-2 items-center">
                      <input
                        type="text"
                        placeholder="Campo"
                        className="border px-2 py-1 rounded flex-1"
                        value={opt.text}
                        onChange={(e) =>
                          handleOptionChange(i, j, "text", e.target.value)
                        }
                      />
                      <label className="flex items-center space-x-1">
                        <input
                          type="checkbox"
                          checked={opt.isCorrect}
                          onChange={(e) =>
                            handleOptionChange(
                              i,
                              j,
                              "isCorrect",
                              e.target.checked
                            )
                          }
                        />
                        <span>Correcta</span>
                      </label>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded mt-1"
                    onClick={() => addOption(i)}
                  >
                    Agregar opción
                  </button>
                </div>
              )}

              {q.type === "OPEN" && (
                <div className="space-y-1">
                  <label className="font-semibold">Respuesta correcta</label>
                  <input
                    type="text"
                    placeholder="Campo"
                    className="border px-2 py-1 rounded w-full"
                    value={q.correctAnswer}
                    onChange={(e) =>
                      handleQuestionChange(i, "correctAnswer", e.target.value)
                    }
                    required
                  />
                </div>
              )}
            </div>
          ))}

          <div className="flex justify-center mt-4">
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              onClick={addQuestion}
            >
              Agregar pregunta
            </button>
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={() => navigate(`/admin/questionnaire/details/${courseId}`)}
            className="w-40 bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded font-semibold"
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="w-40 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded font-semibold"
            disabled={loading}
          >
            {loading ? "Guardando..." : "Crear cuestionario"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateQuestionnaire