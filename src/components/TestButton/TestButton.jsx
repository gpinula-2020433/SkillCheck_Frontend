import React from 'react'
import { useTest } from './useTest'

export const TestButton = () => {
  const { test, loading, error, message } = useTest()

  const handleClick = () => {
    test()
  }

  return (
    <div className="text-center">
      <button
        onClick={handleClick}
        disabled={loading}
        className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
      >
        {loading ? 'Verificando...' : 'Probar Cookie'}
      </button>

      {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}
      {message && <p className="mt-2 text-center text-sm text-green-600">{message}</p>}
    </div>
  )
}
export default TestButton