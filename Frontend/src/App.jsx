import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './app.routes.jsx'
import { AuthProvider } from './context/auth.context.jsx'
import { Toaster } from "react-hot-toast";
import { ResumeProvider } from './context/resumeContext.jsx';

const App = () => {
  return (
    
    <AuthProvider>
      <ResumeProvider>
        <Toaster position="top-right" />
        <RouterProvider router={router} />
      </ResumeProvider>
    </AuthProvider>
  )
}

export default App
