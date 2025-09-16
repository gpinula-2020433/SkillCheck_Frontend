import { useState } from 'react'
import { useRegisterTeacher } from '../../shared/hooks/auth/useRegisterTeacher'
import { useNavigate } from 'react-router-dom'
import { Input } from '../Input'

export const RegisterTeacher = () => {
  const { registerTeacher, loading, error, success } = useRegisterTeacher()
  const navigate = useNavigate()

  const initialForm = {
    name: { value: '', isValid: false, showError: false },
    surname: { value: '', isValid: false, showError: false },
    email: { value: '', isValid: false, showError: false },
    password: { value: '', isValid: false, showError: false }
  }

  const [formData, setFormData] = useState(initialForm)
  const [formErrors, setFormErrors] = useState({})

  const isSubmitDisabled = !formData.name.isValid || !formData.surname.isValid || !formData.email.isValid || !formData.password.isValid

  const handleValueChange = (value, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: { ...prev[field], value }
    }))
    setFormErrors(prev => ({ ...prev, [field]: '' }))
  }

  const handleValidationOnBlur = (value, field) => {
    const isValid = value.trim() !== ''
    setFormData(prev => ({
      ...prev,
      [field]: { ...prev[field], isValid, showError: !isValid }
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formToSend = {
      name: formData.name.value,
      surname: formData.surname.value,
      email: formData.email.value,
      password: formData.password.value,
      role: 'TEACHER'
    }

    const result = await registerTeacher(formToSend)

    if (!result.error) {
      setTimeout(() => navigate('/auth/login'), 1500)
    }

    if (result?.errors && Array.isArray(result.errors)) {
      const formattedErrors = {}
      result.errors.forEach(err => {
        formattedErrors[err.param] = err.msg
      })
      setFormErrors(formattedErrors)
    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Registro de Profesor</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            field="name"
            label="Nombre"
            value={formData.name.value}
            onChangeHandler={handleValueChange}
            placeholder="Ingresa el nombre"
            type="text"
            onBlurHandler={handleValidationOnBlur}
            showErrorMessage={formData.name.showError || !!formErrors.name}
            validationMessage={formErrors.name || 'Este campo no puede estar vacío'}
          />

          <Input
            field="surname"
            label="Apellido"
            value={formData.surname.value}
            onChangeHandler={handleValueChange}
            placeholder="Ingresa el apellido"
            type="text"
            onBlurHandler={handleValidationOnBlur}
            showErrorMessage={formData.surname.showError || !!formErrors.surname}
            validationMessage={formErrors.surname || 'Este campo no puede estar vacío'}
          />

          <Input
            field="email"
            label="Correo"
            value={formData.email.value}
            onChangeHandler={handleValueChange}
            placeholder="Ingresa el correo"
            type="email"
            onBlurHandler={handleValidationOnBlur}
            showErrorMessage={formData.email.showError || !!formErrors.email}
            validationMessage={formErrors.email || 'Este campo no puede estar vacío'}
          />

          <Input
            field="password"
            label="Contraseña"
            value={formData.password.value}
            onChangeHandler={handleValueChange}
            placeholder="Ingresa la contraseña"
            type="password"
            onBlurHandler={handleValidationOnBlur}
            showErrorMessage={formData.password.showError || !!formErrors.password}
            validationMessage={formErrors.password || 'Este campo no puede estar vacío'}
          />

          <button
            type="submit"
            disabled={isSubmitDisabled || loading}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition duration-200 ${
              isSubmitDisabled || loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75'
            }`}
          >
            {loading ? 'Registrando...' : 'Registrar'}
          </button>
        </form>

        {error && <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">{error}</div>}
        {success && <div className="mt-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm">{success}</div>}
      </div>

       
    </div>
  )
}