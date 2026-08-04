import React from 'react'

const InputField = ({label, placeholder, type = 'text', value, onChange}) => (
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

export default function Projects({isOpen, onToggle, resumeData, setResumeData}) {
  return (
    <div className="space-y-3">
      <SectionTitle
        title="PROJECTS"
        icon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5h3.2a1.5 1.5 0 0 1 1.06.44l1.48 1.48A1.5 1.5 0 0 0 12.3 7.5H18.5A2.5 2.5 0 0 1 21 10v7.5A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5v-10Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        }
        isOpen={isOpen}
        onToggle={onToggle}
      />
      {isOpen && (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_0_30px_rgba(6,182,212,0.08)] backdrop-blur-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <InputField
              label="Project Name"
              placeholder="AI Resume Builder"
              value={resumeData.projects[0]?.projectName || ''}
              onChange={(e) => setResumeData({...resumeData, projects: [{...resumeData.projects[0], projectName: e.target.value}]})}
            />
            <InputField
              label="Technologies"
              placeholder="React, Tailwind, Node.js"
              value={resumeData.projects[0]?.technologies || ''}
              onChange={(e) => setResumeData({...resumeData, projects: [{...resumeData.projects[0], technologies: e.target.value}]})}
            />
            <div className="md:col-span-2">
              <TextAreaField
                label="Description"
                placeholder="Describe the project and your role..."
                value={resumeData.projects[0]?.description || ''}
                onChange={(e) => setResumeData({...resumeData, projects: [{...resumeData.projects[0], description: e.target.value}]})}
              />
            </div>
            <div className="md:col-span-2">
              <InputField
                label="Project Link"
                type="url"
                placeholder="https://example.com"
                value={resumeData.projects[0]?.link || ''}
                onChange={(e) => setResumeData({...resumeData, projects: [{...resumeData.projects[0], link: e.target.value}]})}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
