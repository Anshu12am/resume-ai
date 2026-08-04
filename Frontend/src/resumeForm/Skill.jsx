import React from 'react'
import { useState } from 'react'

export default function Skill({resumeData, setResumeData}) {

  const [skillInput, setSkillInput] = useState("");
  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-wide">SKILLS</h3>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <input
          placeholder="Add a skill..."
          className="flex-1 bg-white/5 rounded-xl border border-white/6 px-3 py-2 placeholder:text-slate-400 text-white"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
        />
        <button
          className="bg-green-600 text-white rounded-xl px-3 py-2"
          onClick={() => {
            if (skillInput.trim() !== "") {
              setResumeData({...resumeData, skills: [...resumeData.skills, skillInput.trim()]});
              setSkillInput("");
            }
          }}
        >
          +
        </button>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
  {
    resumeData.skills.map((skill, index) => (
      <span
        key={index}
        className="rounded-full bg-white/10 px-3 py-1 text-sm text-white"
      >
        {skill}
      </span>
    ))
  }
</div>
    </div>
  )
}
