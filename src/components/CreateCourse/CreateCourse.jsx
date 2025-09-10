import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { createCourseRequest } from "../../services/apiCourse"
import apiClient from "../../services/api"
import { useAuth } from "../../shared/hooks/auth/context/AuthProvider"

const CreateCourse = () => {
  const [competencias, setCompetencias] = useState([])
  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [profesor, setProfesor] = useState("")
  const [profesores, setProfesores] = useState([])
  const [imagen, setImagen] = useState(null)
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfesores = async () => {
      if (user?.role === "ADMIN") {
        try {
          const res = await apiClient.get("/v1/user/allTeachers", { withCredentials: true })
          setProfesores(res.data.teachers || [])
        } catch (err) {
          console.error("Error cargando profesores", err)
        }
      } else if (user?.role === "TEACHER") {
        setProfesor(user.uid)
      }
    }
    fetchProfesores()
  }, [user])

  const handleAddCompetencia = () => {
    if (competencias.length < 5) {
      setCompetencias([
        ...competencias,
        { id: competencias.length + 1, competenceName: "", number: competencias.length + 1 },
      ])
    }
  }

  const handleCompetenceChange = (index, value) => {
    const newCompetencias = [...competencias]
    newCompetencias[index].competenceName = value
    setCompetencias(newCompetencias)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("name", nombre)
    formData.append("description", descripcion)
    formData.append("teacher", profesor)
    if (imagen) formData.append("imageCourse", imagen)
    formData.append("competences",JSON.stringify(competencias.map(c => c.competenceName)))

    const res = await createCourseRequest(formData)
    if (!res.error) {
      navigate("/admin/courses")
    } else {
      alert(res.message)
      console.error(res.details)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 font-sans mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-6">Crear un nuevo Curso</h1>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Nombre del Curso</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            placeholder="Ingrese el nombre del curso"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Descripción del curso</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            placeholder="Ingrese una breve descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          ></textarea>
        </div>

        {user?.role === "ADMIN" && (
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Profesor encargado</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={profesor}
              onChange={(e) => setProfesor(e.target.value)}
              required
            >
              <option value="">Seleccione un profesor</option>
              {profesores.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name} {p.surname}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Imagen del curso</label>
          <input
            type="file"
            accept="image/*"
            className="w-full"
            onChange={(e) => setImagen(e.target.files[0])}
          />
        </div>

        <div className="mb-6 text-center">
          <p className="text-gray-700 text-sm mb-2">
            Agregar cuestionario o alumnos al curso (Próximamente)
          </p>
          <button
            type="button"
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded cursor-not-allowed"
            disabled
          >
            Agregar Cuestionarios
          </button>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => navigate("/admin/courses")}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
          >
            Crear
          </button>
        </div>
      </form>

      <div>
        <h2 className="text-lg font-bold mb-3">Competencias</h2>
        <button
          type="button"
          onClick={handleAddCompetencia}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-3"
        >
          Agregar competencias
        </button>

        <table className="w-full border border-gray-300 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">No.</th>
              <th className="px-4 py-2 border">Nombre de la competencia</th>
            </tr>
          </thead>
          <tbody>
            {competencias.map((comp, index) => (
              <tr key={comp.id}>
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">
                  <input
                    type="text"
                    className="w-full border rounded px-2 py-1"
                    placeholder="Ingrese competencia"
                    value={comp.competenceName}
                    onChange={(e) => handleCompetenceChange(index, e.target.value)}
                    required
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CreateCourse