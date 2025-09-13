import React, { useEffect, useState, useRef } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../shared/hooks/auth/context/AuthProvider'
import toast from 'react-hot-toast'

export const ProtectedRoute = () => {
  const { user, loading } = useAuth()
  if (loading) return null
  return user ? <Outlet /> : <Navigate to="/auth/login" replace />
}

//Ruta solo para ADMIN o TEACHER
export const ProtectedRouteAdmin = () => {
  const { user, loading } = useAuth()
  const [accessDenied, setAccessDenied] = useState(false)
  const didToast = useRef(false)

  useEffect(() => {
    if (user && !['ADMIN', 'TEACHER'].includes(user.role) && !didToast.current) {
      toast.error('No tienes acceso a esta sección')
      setAccessDenied(true)
      didToast.current = true
    }
  }, [user])

  if (loading) return null
  if (!user) return <Navigate to="/auth/login" replace />
  if (accessDenied) return <Navigate to="/main/timeline" replace />

  return <Outlet />
}

export const ProtectedRouteStudent = () => {
  const { user, loading } = useAuth()
  const [accessDenied, setAccessDenied] = useState(false)
  const didToast = useRef(false)

  useEffect(() => {
    if (user && user.role !== 'STUDENT' && !didToast.current) {
      toast.error('No tienes acceso a esta sección')
      setAccessDenied(true)
      didToast.current = true
    }
  }, [user])

  if (loading) return null
  if (!user) return <Navigate to="/auth/login" replace />
  if (accessDenied) return <Navigate to="/main/home" replace />

  return <Outlet />
}

export const RootRedirect = () => {
  const { user, loading } = useAuth()
  if (loading) return null
  return user ? <Navigate to="/main" replace /> : <Navigate to="/auth/login" replace />
}
