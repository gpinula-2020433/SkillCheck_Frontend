import { useState } from 'react'
import { useRoutes } from "react-router-dom"
import './App.css'
import { routes } from "./routes"
import { Toaster } from "react-hot-toast"
import Modal from "react-modal"
import { DarkModeProvider } from './context/DarkModeContext'

Modal.setAppElement('#root')

function App() {
    const elements = useRoutes(routes)
  return (
    <DarkModeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
        {elements}
        <Toaster position="bottom-right" reverseOrder={false}/>
      </div>
    </DarkModeProvider>
  )
}

export default App