import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Hero = () => {

  const navigate = useNavigate()
  const { user } = useAuth()

  const handleClick = ()=>{
    if(user){
      navigate("/dashboard")
    }else{
      navigate("/register")
    }
  }
  return (
    <header className="relative overflow-hidden">
      <div className="bg-grid absolute inset-0 opacity-30 pointer-events-none" />

      <div className="absolute inset-0 -z-10">
        <div className="absolute -right-10 top-10 w-80 h-80 bg-gradient-to-br from-purple-600 to-cyan-400 opacity-30 rounded-full blur-3xl transform rotate-12 mix-blend-screen" />
        <div className="absolute left-0 bottom-[-8rem] w-96 h-96 bg-gradient-to-br from-cyan-400 to-purple-700 opacity-20 rounded-full blur-2xl mix-blend-screen" />
        <div className="absolute right-20 bottom-20 w-64 h-64 border border-cyan-400/20 rounded-full opacity-40 blur-sm" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 pb-16 md:pb-28">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-white">
            Build <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">ATS</span>-Optimized
            <br /> Resumes with <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">AI</span>
          </h1>

          <p className="mt-6 text-slate-300 text-lg md:text-xl">
            Create professional resumes and cover letters tailored to any job description. Let AI optimize your content for
            Applicant Tracking Systems.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4 flex-col sm:flex-row">
            <button onClick={handleClick} className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 text-slate-900 font-semibold shadow-neon transition-transform hover:scale-105">
              Get Started Free
            </button>
            <button className="px-8 py-4 rounded-full bg-white/5 border border-cyan-400/20 text-cyan-200 font-semibold backdrop-blur-xl transition hover:shadow-md">
              Explore Features
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Hero
