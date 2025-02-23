import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './Login.tsx'
import Welcome from './Welcome.tsx'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App