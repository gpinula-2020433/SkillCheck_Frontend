import React, { useState } from 'react'
import { Input } from '../Input'
import { useLogin } from '../../shared/hooks/auth/useLogin'
import { Link } from 'react-router-dom'

export const Login = () => {
  const form = {
    userLoggin: {
      value: '',
      isValid: false,
      showError: false
    },
    password: {
      value: '',
      isValid: false,
      showError: false
    }
  }

  const [formData, setFormData] = useState(form)
  const { login, isLoading, error } = useLogin()

  const isSubmitButtonDisabled = !formData.userLoggin.isValid || !formData.password.isValid

  const handleSubmit = (event) => {
    event.preventDefault()
    login(formData.userLoggin.value, formData.password.value)
  }

  const handleValidationOnBlur = (value, field) => {
    const isValid = value.trim() !== ''
    setFormData((prevData) => ({
      ...prevData,
      [field]: {
        ...prevData[field],
        isValid,
        showError: !isValid
      }
    }))
  }

  const handleValueChange = (value, field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: {
        ...prevData[field],
        value
      }
    }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Iniciar Sesión</h2>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            field='userLoggin'
            label='Usuario o Email'
            value={formData.userLoggin.value}
            onChangeHandler={handleValueChange}
            placeholder="Ingresa tu usuario o email"
            type='text'
            onBlurHandler={handleValidationOnBlur}
            showErrorMessage={formData.userLoggin.showError}
            validationMessage='Este campo no puede estar vacío'
          />
          <Input
            field='password'
            label='Contraseña'
            value={formData.password.value}
            onChangeHandler={handleValueChange}
            placeholder="Ingresa tu contraseña"
            type='password'
            onBlurHandler={handleValidationOnBlur}
            showErrorMessage={formData.password.showError}
            validationMessage='Este campo no puede estar vacío'
          />
          
          <button 
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition duration-200 ${
              isSubmitButtonDisabled || isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75'
            }`}
            disabled={isSubmitButtonDisabled || isLoading} 
            type='submit'
          >
            {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
        </form>
        
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}
        

         <p className="mt-4 text-center text-sm">
          ¿No tienes cuenta?{' '}
          <Link to="/auth/register" className="text-blue-600 hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  )
}