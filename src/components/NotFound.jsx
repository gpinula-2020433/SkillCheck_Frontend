import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900 px-6 text-center transition-colors">
      <h1 className="text-6xl font-extrabold text-[#0059CA] dark:text-[#7CFFC8] mb-4">
        404
      </h1>
      <p className="text-2xl sm:text-3xl text-gray-800 dark:text-gray-200 mb-2">
        Página no encontrada
      </p>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mb-6">
        Lo sentimos, la página que buscas no existe o ha sido movida.
      </p>
      <Link
        to="/"
        className="inline-block bg-[#0059CA] dark:bg-[#7CFFC8] text-white dark:text-gray-900 font-semibold px-6 py-3 rounded-md shadow-md hover:bg-[#004bb5] dark:hover:bg-[#5effb5] transition-colors duration-300"
      >
        Regresar a la página principal
      </Link>
    </section>
  )
}

export default NotFound
