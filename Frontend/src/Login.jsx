import React from 'react'
import AuthCard from './components/AuthCard'

export default function Login() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#030417] via-[#05021a] to-[#030417] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none"></div>

      <div className="blob left-[-120px] top-[-80px]" aria-hidden></div>
      <div className="blob right-[-140px] bottom-[-100px] rotate-45" aria-hidden style={{background: 'radial-gradient(circle at 70% 30%, rgba(124,58,237,0.9), rgba(6,182,212,0.7) 40%, rgba(124,58,237,0.03) 70%)'}}></div>

      <div className="relative z-10 w-full px-6 py-20">
        <AuthCard />
      </div>
    </div>
  )
}
