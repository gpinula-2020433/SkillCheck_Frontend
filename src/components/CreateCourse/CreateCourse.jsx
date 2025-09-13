import React from "react"
import { useCreateCourse } from "../../shared/hooks/courses/useCreateCourse"

const CreateCourse = () => {
  const {
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
  } = useCreateCourse()

  return (
    <div className="max-w-6xl mx-auto p-6 font-sans mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-6">Crear un nuevo Curso</h1>

        {/* Nombre */}
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

        {/* Descripción */}
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

        {/* Profesor solo si es ADMIN */}
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

        {/* Asignar alumnos */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Asignar alumnos</label>
          <select
            multiple
            className="w-full border rounded px-3 py-2 h-40"
            value={alumnosSeleccionados}
            onChange={(e) => {
              const selected = Array.from(e.target.selectedOptions, option => option.value)
              setAlumnosSeleccionados(selected)
            }}
          >
            {alumnos.map((a) => (
              <option key={a._id} value={a._id}>
                {a.name} {a.surname} - {a.email}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Mantén Ctrl (Windows) o Cmd (Mac) para seleccionar múltiples alumnos
          </p>
        </div>

        {/* Imagen */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Imagen del curso</label>
          <input
            type="file"
            accept="image/*"
            className="w-full"
            onChange={(e) => setImagen(e.target.files[0])}
          />
        </div>

        {/* Botones */}
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

      {/* Competencias */}
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