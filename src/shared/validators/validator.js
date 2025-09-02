export const validateEmail = (email) => {
    // Regex para validar un correo electrónico con un formato adecuado.
    const regex = /\S+@\S+\.\S+/
    return regex.test(email)
}

export const validateName = (name) => {
    // El nombre debe tener entre 1 y 25 caracteres.
    const regex = /^.{1,25}$/
    return regex.test(name)
}

export const validateSurname = (surname) => {
    // El apellido debe tener entre 1 y 25 caracteres.
    const regex = /^.{1,25}$/
    return regex.test(surname)
}

export const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])\S{8,20}$/;
  return regex.test(password);
};


export const validatePassConfirm = (password, passConfirm) => {
    // La contraseña de confirmación debe coincidir con la contraseña original.
    return password === passConfirm
}


/* ---------------------MENSAJES DE VALIDACIÓN--------------------- */
export const emailValidationMessage = 'Por favor ingresa un correo válido'
export const passwordValidationMessage = 'La contraseña debe ser más fuerte, debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos'
export const passConfirmValidationMessage = 'Las contraseñas no coinciden'
export const nameValidationMessage = 'El nombre debe contener entre 1 y 25 caracteres'
export const surnameValidationMessage = 'El apellido debe contener entre 1 y 25 caracteres'
