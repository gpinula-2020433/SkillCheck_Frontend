import { useState } from 'react'
import { useRoutes } from "react-router-dom"
import './App.css'
import { routes } from "./routes"
import { Toaster } from "react-hot-toast"
import Modal from "react-modal"

Modal.setAppElement('#root')

function App() {
    const elements = useRoutes(routes)
  return (
    <>
      {elements}
      <Toaster position="bottom-right" reverseOrder={false}/>
    </>
  )
}

export default App