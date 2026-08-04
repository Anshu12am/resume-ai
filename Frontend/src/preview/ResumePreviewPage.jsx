import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import ResumePreview from './ResumePreview'
import { downloadResume } from '../utils/downloadResume'
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { getResumeById } from '../services/resume.api'

export default function ResumePreviewPage() {
  
  const navigate = useNavigate();
  const { id } = useParams();
  const [resume, setResume] = useState(null);

  useEffect(()=>{
    const fetchResume = async () =>{
      try{
        const response = await getResumeById(id);
        console.log(response.data);
        setResume(response.data);
      }catch(error){
        console.log(error)
      }
    };
    fetchResume();
  },[id])

  const analysis = resume?.atsAnalysis;

  const hasAtsScore = typeof analysis?.atsScore === 'number' && analysis.atsScore > 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050816] via-[#070521] to-[#050816] text-white overflow-x-hidden">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <header className="mb-5 flex flex-col gap-4 rounded-[24px] border border-white/10 bg-slate-950/60 px-4 py-4 shadow-[0_0_30px_rgba(34,211,238,0.12)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:-translate-y-0.5 hover:bg-white/10 hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="stroke-current">
              <path d="M15 18 9 12l6-6" />
            </svg>
            Back to Dashboard
          </Link>

          <div className="flex flex-wrap items-center gap-3 sm:justify-end">
            <Link
              to={`/resume/edit/${resume?._id}`}
              className="inline-flex h-11 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-500/15 px-4 py-2 text-sm font-semibold text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-cyan-400/25 hover:shadow-[0_0_24px_rgba(34,211,238,0.2)]"
            >
              Edit Resume
            </Link>
            <button
              type="button"
              onClick={downloadResume}
              className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 bg-transparent px-4 py-2 text-sm font-semibold text-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400/30 hover:bg-white/8 hover:text-white"
            >
              Download PDF
            </button>
          </div>
        </header>

        <main className="flex-1">
          <section className="rounded-[28px] border border-white/10 bg-slate-950/60 p-2 shadow-[0_0_30px_rgba(8,145,178,0.08)] backdrop-blur-xl sm:p-3 lg:p-4">
            <div className="overflow-hidden rounded-[22px] bg-slate-900/70 px-2 py-3 sm:px-3 sm:py-4">
              <ResumePreview resumeData={resume?.resumeData} />
            </div>
          </section>

          <section className="mt-5 rounded-[22px] border border-white/10 bg-white/5 p-3 shadow-[0_0_20px_rgba(34,211,238,0.06)] backdrop-blur-xl sm:p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                {/* <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/90">ATS Analysis</p> */}
                <div className="flex items-baseline gap-2">
                  <span className="text-xl text-slate-300">ATS Score:</span>
                  <span className="text-2xl font-semibold tracking-tight text-cyan-200">
                    {hasAtsScore ? `${analysis?.atsScore}%` : '0%'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="inline-flex h-11 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-500/15 px-4 py-2 text-sm font-semibold text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-cyan-400/25 hover:shadow-[0_0_22px_rgba(34,211,238,0.18)]"
              >
                View Analysis
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
