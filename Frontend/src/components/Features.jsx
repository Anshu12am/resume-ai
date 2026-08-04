import React from 'react'
import {
  Sparkles,
  ShieldCheck,
  WandSparkles,
  Mail,
  Search,
  FileDown
} from 'lucide-react';

const features = [
  { title: 'AI-Generated Summaries', desc: 'Get professional summaries written by AI based on your experience and target role.' ,
    icon:Sparkles
  },
  { title: 'ATS Optimization', desc: 'Score your resume against job descriptions and get keyword suggestions to pass ATS filters.' , icon:ShieldCheck },
  { title: 'Smart Content Improvement', desc: 'AI enhances your bullet points with action verbs, metrics, and impactful language.' , icon:WandSparkles },
  { title: 'Cover Letter Generator', desc: 'Generate tailored cover letters for any role with adjustable tone and style.' , icon:Mail },
  { title: 'Keyword Analysis', desc: 'See exactly which keywords are missing and how to add them naturally.' , icon:Search },
  { title: 'Export as PDF', desc: 'Download your polished resume and cover letter as professional PDF documents.' , icon:FileDown }
]

const Features = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
      <div className="text-center">
        <div className="inline-block px-4 py-2 rounded-full bg-purple-900/40 text-sm text-purple-300 font-semibold">CAPABILITIES</div>
        <h2 className="mt-6 text-4xl md:text-5xl font-extrabold text-white">Everything You Need to <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">Land the Job</span></h2>
        <p className="mt-3 text-slate-400">Powered by advanced AI to give you an unfair advantage in your job search.</p>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((f) => {
  const Icon = f.icon;

  return (
    <div
      key={f.title}
      className="p-6 rounded-2xl bg-white/3 border border-white/6 backdrop-blur-xl hover:shadow-neon transition transform hover:scale-[1.02]"
    >
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/20">
        <Icon className="w-4 h-4 text-white" />
      </div>

      <h3 className="text-xl font-bold text-white">{f.title}</h3>
      <p className="mt-2 text-slate-300">{f.desc}</p>
    </div>
  );
})}
      </div>
    </section>
  )
}

export default Features
