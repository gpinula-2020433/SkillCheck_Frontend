import React from 'react'
import Timeline from '../../components/AllQuestionnaire/Timeline'
import TestButton from '../../components/TestButton/TestButton'

export const HomePage = () => {
  return (
    <div>
      <Timeline/>
      {/*
        Aquí puse esto porque no sé qué más vamos a poner en el home,
        o ponemos directamente solo la línea de tiempo de las tareas

        El test solo está porque todavía estoy probando la cookie
      */}
      <br />
      <TestButton/>
    </div>
  )
}
