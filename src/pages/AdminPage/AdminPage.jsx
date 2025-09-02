import React from 'react'
import { Navbar } from '../../components/layout/Navbar'
import { Footer } from '../../components/layout/Footer'
import { Outlet } from 'react-router-dom'

export const AdminPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow mt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}