import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { createCourseRequest, assignStudentToCourseRequest } from "../../../services/apiCourse"
import apiClient from "../../../services/api"
import { useAuth } from "../../../shared/hooks/auth/context/AuthProvider"

export const useCreateCourse = () => {
  const [competencias, setCompetencias] = useState([])
  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [profesor, setProfesor] = useState("")
  const [profesores, setProfesores] = useState([])
  const [imagen, setImagen] = useState(null)
  const [alumnos, setAlumnos] = useState([])
  const [alumnosSeleccionados, setAlumnosSeleccionados] = useState([])
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

    const fetchAlumnos = async () => {
      try {
        const res = await apiClient.get("/v1/user/allStudents", { withCredentials: true })
        setAlumnos(res.data.students || [])
      } catch (err) {
        console.error("Error cargando alumnos", err)
      }
    }

    fetchProfesores()
    fetchAlumnos()
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
    formData.append("competences", JSON.stringify(competencias.map(c => c.competenceName)))

    const res = await createCourseRequest(formData)
    if (!res.error) {
      const courseId = res.course?._id

      // asignar alumnos seleccionados
      for (const studentId of alumnosSeleccionados) {
        await assignStudentToCourseRequest(studentId, courseId)
      }

      navigate("/admin/courses")
    } else {
      alert(res.message)
      console.error(res.details)
    }
  }

  return {
    competencias,
    profesores,
    profesor,
    nombre,
    descripcion,
    imagen,
    alumnos,
    alumnosSeleccionados,
    setAlumnosSeleccionados,
    setProfesor,
    setNombre,
    setDescripcion,
    setImagen,
    handleAddCompetencia,
    handleCompetenceChange,
    handleSubmit,
    navigate,
    user
  }
}