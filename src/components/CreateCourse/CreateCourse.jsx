import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {
  const [competencias, setCompetencias] = useState([]);
  const navigate = useNavigate();

  const handleAddCompetencia = () => {
    if (competencias.length < 5) {
      setCompetencias([...competencias, { id: competencias.length + 1, name: "" }]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 font-sans mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Formulario de creación de curso */}
      <div>
        <h1 className="text-2xl font-bold mb-6">Crear un nuevo Curso</h1>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Nombre del Curso</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            placeholder="Ingrese el nombre del curso"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Descripción del curso</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            placeholder="Ingrese una breve descripción"
          ></textarea>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Profesor o encargado</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            placeholder="Ingrese el nombre del profesor"
          />
        </div>

        <div className="mb-6 text-center">
          <p className="text-gray-700 text-sm mb-2">
            Agregar cuestionario o alumnos al curso**  
            Organice el contenido de su curso en añadiendo cuestionarios.
          </p>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded">
            Agregar Cuestionarios
          </button>
        </div>

        <div className="flex gap-4">
          <button onClick={() => navigate("/admin/courses")} className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded">
            Cancelar
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded">
            Crear
          </button>
        </div>
      </div>

      {/* Competencias */}
      <div>
        <h2 className="text-lg font-bold mb-3">Competencias</h2>
        <button
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
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">
                  {competencias[index] ? (
                    <input
                      type="text"
                      className="w-full border rounded px-2 py-1"
                      placeholder="Ingrese competencia"
                      value={competencias[index].name}
                      onChange={(e) => {
                        const newCompetencias = [...competencias];
                        newCompetencias[index].name = e.target.value;
                        setCompetencias(newCompetencias);
                      }}
                    />
                  ) : (
                    ""
                  )}
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