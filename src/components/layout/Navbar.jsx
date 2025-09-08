import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import logoSkillCheck from '../../assets/skillCheck.png'
import { NavButton } from '../NavButton'
import { useAuth } from '../../shared/hooks/auth/context/AuthProvider'
import {useLogout} from '../../shared/hooks/auth/useLogout'

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const { user } = useAuth()
  const {logout } = useLogout()

  const handleLinkClick = (route) => {
    setMenuOpen(false)
    navigate(route)
  }

  const handleLogout = async () => {
    await logout()
    navigate('/auth/login')
  }

  const navLinks = (
    <>
      <li>
        <NavButton text="Principal" onClickHandler={() => handleLinkClick('/main/timeline')} />
      </li>
      <li>
        <NavButton text="Cursos" onClickHandler={() => handleLinkClick('/main/courses')} />
      </li>
      <li>
        <NavButton text="Calificaciones" onClickHandler={() => handleLinkClick('/main/grades')} />
      </li>

      {/* Solo para ADMIN o TEACHER */}
      {user && ['ADMIN', 'TEACHER'].includes(user.role) && (
        <li>
          <NavButton text="Administración" onClickHandler={() => handleLinkClick('/admin')} />
        </li>
      )}

      {/* Si no está logeado */}
      {!user && (
        <li>
          <NavButton text="Iniciar sesión" onClickHandler={() => handleLinkClick('/auth/login')} />
        </li>
      )}

      {/* Si está logeado */}
      {user && (
        <li>
          <NavButton text="Cerrar sesión" onClickHandler={handleLogout} />
        </li>
      )}
    </>
  )

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/30 backdrop-blur-md shadow-sm h-16">
      <nav className="container mx-auto flex items-center justify-between px-4 h-full">
        <Link to="/" className="flex items-center h-full">
          <img src={logoSkillCheck} alt="Logo" className="h-7 w-auto" />
        </Link>

        <ul className="hidden md:flex space-x-6 text-gray-700 items-center">
          {navLinks}
        </ul>

        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl text-gray-700">
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="absolute top-16 right-0 w-1/2 bg-white px-6 py-8 shadow-lg z-40 flex flex-col gap-5 rounded-bl-lg text-sm text-gray-800 transition-all duration-300">
          <ul className="flex flex-col gap-4">{navLinks}</ul>
        </div>
      )}
    </header>
  )
}
