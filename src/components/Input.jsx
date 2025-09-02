import React from 'react'
import PropTypes from 'prop-types'

export const Input = ({
    field,
    label,
    value,
    onChangeHandler,
    showErrorMessage,
    validationMessage,
    onBlurHandler,
    type,
    placeholder,
    textarea
}) => {
    
    const handleValueChange = (e)=>{
        onChangeHandler(e.target.value, field)
    }

    const handleOnBlur = (e)=>{
        onBlurHandler(e.target.value, field)
    }
    
  return (
    <div className="mb-4">
        {/* Label en negrita */}
        <div className='mb-1'>
            <span className="block text-sm font-medium text-gray-700 font-bold">{label}</span>
        </div>
        
        {
            textarea ? (
                <textarea
                    type={type}
                    value={value}
                    onChange={handleValueChange}
                    onBlur={handleOnBlur}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    style={{maxWidth: '400px'}}
                />
            ) : (
                <input
                    type={type}
                    value={value}
                    onChange={handleValueChange}
                    onBlur={handleOnBlur}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                />
            )
        }
        
        {/* Mensaje de error debajo del input */}
        <div className="mt-1">
            <span className="text-red-500 text-xs">
                {showErrorMessage && validationMessage}
            </span>
        </div>
    </div>
  )
}

Input.propTypes = {
    field: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChangeHandler: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    showErrorMessage: PropTypes.bool.isRequired,
    validationMessage: PropTypes.string,
    onBlurHandler: PropTypes.func.isRequired,
    textarea: PropTypes.bool
}