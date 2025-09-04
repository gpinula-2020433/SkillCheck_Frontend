import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateQuestionnaire = () => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [preguntas, setPreguntas] = useState([]);
  const navigate = useNavigate()

  const handleAgregarPregunta = () => {
    setPreguntas([...preguntas, { texto: "" }]);
  };

  const handleChangePregunta = (index, value) => {
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas[index].texto = value;
    setPreguntas(nuevasPreguntas);
  };

  const handleCrear = () => {
    const cuestionario = {
      titulo,
      descripcion,
      preguntas,
    };
    console.log("Cuestionario creado:", cuestionario);
    alert("Cuestionario creado con éxito");
  };

  const handleCancelar = () => {
    setTitulo("");
    setDescripcion("");
    setPreguntas([]);
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10">
      <h2 className="text-center text-xl font-bold mb-6">
        Crear nuevo cuestionario
      </h2>

      <label className="block mb-2 font-semibold">
        Actividad
        <input
          type="text"
          placeholder="Actividad ejemplo matemática"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full mt-1 p-2 border rounded-md bg-gray-100"
        />
      </label>

      <label className="block mb-2 font-semibold">
        Descripción o instrucciones de la actividad
        <textarea
          placeholder="Escribe la descripción aquí..."
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full mt-1 p-2 border rounded-md bg-gray-100"
        />
      </label>

      <div className="mt-4">
        <h3 className="font-semibold mb-2">Preguntas</h3>
        {preguntas.length === 0 ? (
          <p className="text-gray-500 text-sm mb-3">
            Agrega preguntas al cuestionario. Comienza a construir tu cuestionario
            añadiendo preguntas.
          </p>
        ) : (
          preguntas.map((pregunta, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Pregunta ${index + 1}`}
              value={pregunta.texto}
              onChange={(e) => handleChangePregunta(index, e.target.value)}
              className="w-full mb-2 p-2 border rounded-md bg-gray-100"
            />
          ))
        )}

        <button
          onClick={handleAgregarPregunta}
          className="w-full bg-gray-200 hover:bg-gray-300 text-black py-2 px-4 rounded-md mt-2"
        >
          Agregar preguntas
        </button>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => navigate("/admin/courses")}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
        >
          Cancelar
        </button>
        <button
          onClick={handleCrear}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Crear
        </button>
      </div>
    </div>
  )
}

export default CreateQuestionnaire