import { useNavigate } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

export const BackButton = ({ className = "", text = "Regresar" }) => {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(-1)}
      className={`inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200 font-medium ${className}`}
    >
      <FiArrowLeft className="w-4 h-4" />
      {text}
    </button>
  )
}
