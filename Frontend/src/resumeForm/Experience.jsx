import React from 'react'

const InputField = ({label, placeholder, type = 'text',value, onChange}) => (
  <div className="space-y-2">
    {label && <label className="block text-sm font-medium text-slate-200">{label}</label>}
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full rounded-xl border border-white/6 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-400 input-focus-glow"
    />
  </div>
)

const TextAreaField = ({label, placeholder, value, onChange}) => (
  <div className="space-y-2">
    {label && <label className="block text-sm font-medium text-slate-200">{label}</label>}
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="h-28 w-full resize-none rounded-xl border border-white/6 bg-white/5 p-3 text-sm text-white outline-none placeholder:text-slate-400 input-focus-glow"
    />
  </div>
)

const SectionTitle = ({title, icon, isOpen, onToggle}) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <span className="text-emerald-400">{icon}</span>
      <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-100">{title}</h3>
    </div>
    <button
      type="button"
      onClick={onToggle}
      className="text-sm font-medium text-emerald-400 transition hover:text-emerald-300"
    >
      {isOpen ? 'Hide' : '+ Add'}
    </button>
  </div>
)

const IconTrash = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 7h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M9 7V4h6v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 7l1 12h8l1-12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function Experience({isOpen, onToggle,resumeData,setResumeData}) {
  return (
    <div className="space-y-3">
      <SectionTitle
        title="EXPERIENCE"
        icon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <rect x="4" y="7" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M9 12h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        }
        isOpen={isOpen}
        onToggle={onToggle}
      />
      {isOpen && (
        <div className="relative rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_0_30px_rgba(6,182,212,0.08)] backdrop-blur-sm">
          <button type="button" className="absolute right-4 top-4 rounded-full p-2 text-emerald-400 transition hover:bg-white/10 hover:text-emerald-300">
            <IconTrash />
          </button>

          <div className="grid gap-4 md:grid-cols-2">
            <InputField 
              label="Company" 
              placeholder="Acme Inc." 
              value={resumeData.experience[0]?.company || ''} 
              onChange={(e) => setResumeData({...resumeData, experience: [{...resumeData.experience[0], company: e.target.value}]})} 
            />
            <InputField 
              label="Position" 
              placeholder="Senior Product Designer" 
              value={resumeData.experience[0]?.position || ''} 
              onChange={(e) => setResumeData({...resumeData, experience: [{...resumeData.experience[0], position: e.target.value}]})} 
            />
            <InputField 
              label="Start Date" 
              type="month" 
              placeholder="Select start date" 
              value={resumeData.experience[0]?.startDate || ''} 
              onChange={(e) => setResumeData({...resumeData, experience: [{...resumeData.experience[0], startDate: e.target.value}]})} 
            />
            <InputField 
              label="End Date" 
              type="month" 
              placeholder="Select end date" 
              value={resumeData.experience[0]?.endDate || ''} 
              onChange={(e) => setResumeData({...resumeData, experience: [{...resumeData.experience[0], endDate: e.target.value}]})} 
            />
          </div>

          <div className="mt-4 flex items-center gap-2">
            <input id="current-role" type="checkbox" className="h-4 w-4 rounded border-white/10 bg-[#0f172a]/80 text-emerald-500 focus:ring-emerald-500/20" />
            <label htmlFor="current-role" className="text-sm text-slate-300">Currently working here</label>
          </div>

          <div className="mt-4">
            <TextAreaField value={resumeData.experience[0]?.description||''}
             label="Description" placeholder="Describe your responsibilities and achievements..." onChange={(e) => setResumeData({...resumeData, experience: [{...resumeData.experience[0], description: e.target.value}]})} />
          </div>
        </div>
      )}
    </div>
  )
}
