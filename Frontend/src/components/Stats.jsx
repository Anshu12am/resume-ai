import React from 'react'

const statItems = [
  { title: '95%+', subtitle: 'ATS Score' },
  { title: '<5 min', subtitle: 'Build Time' },
  { title: '100%', subtitle: 'AI Powered' }
]

const Stats = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 md:px-12 mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {statItems.map((s) => (
          <div key={s.title} className="p-6 rounded-2xl bg-white/3 border border-white/6 backdrop-blur-xl shadow-neon flex flex-col items-center text-center">
            <div className="text-3xl font-extrabold text-white">{s.title}</div>
            <div className="mt-2 text-slate-300">{s.subtitle}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Stats
