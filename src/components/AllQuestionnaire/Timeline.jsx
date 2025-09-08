import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../shared/hooks/auth/context/AuthProvider'

export const Timeline = () => {
  const navigate = useNavigate()
  const { user } = useAuth() // obtenemos el usuario del contexto

  const timelineData = [
    {
      date: "Domingo, 24 de Agosto de 2025",
      events: [
        {
          id: 1,
          time: "23:59",
          title: "Actividad ejemplo matemática",
          description: "Cierra cuestionario - Matemática",
          action: "Resolver cuestionario"
        }
      ]
    }
  ]

  return (
    <div className="max-w-4xl mx-auto p-5 font-sans mt-8">
      
      {/* Saludo al usuario */}
      {user && (
        <div className="mb-4 p-4 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-md">
          Bienvenido, <strong>{user.name}</strong>!
        </div>
      )}

      <h1 className="text-2xl font-bold mb-2">Línea de tiempo</h1>
      <p className="text-gray-600 mb-6">Revisa y completa los cuestionarios asignados</p>
      
      <h2 className="text-lg font-semibold mb-4">Próximos</h2>
      
      {timelineData.map((day, dayIndex) => (
        <div key={dayIndex} className="mb-6">
          <h3 className="font-bold mb-3">{day.date}</h3>
          
          {day.events.map((event, eventIndex) => (
            <div key={eventIndex} className="flex mb-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                <div className="w-16 font-bold mr-4">{event.time}</div>
                <div className="flex-1">
                  <strong className="block">{event.title}</strong>
                  <p className="text-gray-600 dark:text-gray-300 my-1">{event.description}</p>
                  <div className="flex justify-end mt-2">
                    <button onClick={() => navigate(`/main/activity/${event.id}`)} 
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                      {event.action}
                    </button>
                  </div>
                </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Timeline
