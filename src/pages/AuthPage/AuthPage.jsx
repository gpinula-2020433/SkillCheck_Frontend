import React from 'react'
import { Outlet } from 'react-router-dom'

export const AuthPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  )
}