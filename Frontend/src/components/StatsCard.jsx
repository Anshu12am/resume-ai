import React from 'react'

export default function StatsCard({ title, value, icon }){
  return (
    <div className="flex-1 min-w-[160px] bg-white/5 rounded-xl border border-white/6 p-4 backdrop-blur hover:scale-[1.01] hover:brightness-105 transition-all duration-300">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-md bg-gradient-to-tr from-blue-400 to-purple-600 flex items-center justify-center text-black flex-shrink-0">{icon}</div>
        <div className="flex-1">
          <div className="text-xl font-semibold text-white leading-tight">{value}</div>
          <div className="text-sm subtle mt-1">{title}</div>
        </div>
      </div>
    </div>
  )
}
