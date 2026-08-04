import React from 'react'

const InputField = ({label, placeholder, type = 'text',value,onChange}) => (
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

export default function Education({isOpen, onToggle,resumeData,setResumeData}) {
  return (
    <div className="space-y-3">
      <SectionTitle
        title="EDUCATION"
        icon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 3 2 7l10 4 10-4-10-4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M5 9v4c0 2.2 3.1 4 7 4s7-1.8 7-4V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M5 13v2c0 2.2 3.1 4 7 4s7-1.8 7-4v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        }
        isOpen={isOpen}
        onToggle={onToggle}
      />
      {isOpen && (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_0_30px_rgba(6,182,212,0.08)] backdrop-blur-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <InputField value={resumeData.education[0].school}
                onChange={(e) => setResumeData({...resumeData, education: [{...resumeData.education[0],
                  school: e.target.value
                }]})}
                label="School" placeholder="University of Example" />
            </div>
            <InputField value={resumeData.education[0].degree}
                onChange={(e) => setResumeData({...resumeData, education: [{...resumeData.education[0],
                  degree: e.target.value
                }]})}
                label="Degree" placeholder="Bachelor of Science" />
            <InputField value={resumeData.education[0].field}
                onChange={(e) => setResumeData({...resumeData, education: [{...resumeData.education[0],
                  field: e.target.value
                }]})}
                label="Field of Study" placeholder="Computer Science" />
            <InputField value={resumeData.education[0].startDate}
                onChange={(e) => setResumeData({...resumeData, education: [{...resumeData.education[0],
                  startDate: e.target.value
                }]})}
                label="Start Date" type="month" placeholder="Select start date" />
            <InputField value={resumeData.education[0].endDate}
                onChange={(e) => setResumeData({...resumeData, education: [{...resumeData.education[0],
                  endDate: e.target.value
                }]})}
                label="End Date" type="month" placeholder="Select end date" />
          </div>
        </div>
      )}
    </div>
  )
}
