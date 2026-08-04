import React from 'react'
import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import StatsCard from './components/StatsCard'
import ResumeCard from './components/ResumeCard'
import CoverLetterCard from './components/CoverLetterCard'
import { getAllResumes } from './services/resume.api'
import { getAllCoverLetters } from './services/coverLetter.api'
import {
  Mail,FileText,LayoutDashboard 
} from 'lucide-react';
export default function Dashboard(){

  const [resumes, setResumes] = useState([]);
  const [coverLetters, setCoverLetters] = useState([]);
  const [activeTab, setActiveTab] = useState('resume');

  const resumeCount = resumes.length;
  const coverLetterCount = coverLetters.length;

  const avgATS = 
  resumes.length > 0
    ? Math.round(
        resumes.reduce(
          (sum, resume) => sum + (resume.atsAnalysis?.overallScore || 0),
          0
        ) / resumes.length
      )
    : 0;
  

  useEffect(()=>{
     const fetchResumes = async () => {
    try{
      const response = await getAllResumes();
      setResumes(response.data);
    }catch(error){
      console.error("Error fetching resumes:", error);
    }
  };
  fetchResumes();
  },[]);

  useEffect(()=>{
      const fetchLetters = async () =>{
        try{
          const response = await getAllCoverLetters();
          setCoverLetters(response.data);
        }catch(error){
          console.error(error)
        }
      };
      fetchLetters()
    },[])

  const handleDeleteResume = (id) => {
    setResumes((prev)=> prev.filter((resume) => resume._id !== id));
  }

   const handleDeleteCoverLetter = (id) => {
    setCoverLetters((prev)=> prev.filter((coverLetter) => coverLetter._id !== id));
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050816] via-[#070521] to-[#050816] text-white overflow-x-hidden">
      <Sidebar />
      <Topbar />
      <main className="pt-16 md:ml-64 lg:ml-72 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <header className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-sm subtle mt-1">Manage your resumes and cover letters</p>
            </div>
          </header>

          <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <StatsCard title="Resumes" value={resumeCount} icon={<FileText className="w-4 h-4 text-white"/>} />
            <StatsCard title="Cover Letters" value={coverLetterCount} icon={<Mail className="w-4 h-4 text-white"/>} />
            <StatsCard title="Avg ATS Score" value={avgATS} icon={<LayoutDashboard className="w-4 h-4 text-white"/>} />
          </section>

          <section>
            <div className="mb-4 flex items-center justify-start">
              <div className="inline-flex items-center rounded-full border border-white/10 bg-slate-950/70 p-1 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-sm">
                <button
                  type="button"
                  onClick={() => setActiveTab('resume')}
                  className={`rounded-full px-3 py-1.5 text-sm font-semibold transition-all ${activeTab === 'resume' ? 'bg-white text-slate-900' : 'text-slate-300'}`}
                >
                  Resume
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('coverLetter')}
                  className={`ml-1 rounded-full px-3 py-1.5 text-sm font-semibold transition-all ${activeTab === 'coverLetter' ? 'bg-white text-slate-900' : 'text-slate-300'}`}
                >
                  Cover letter
                </button>
              </div>
            </div>

            {activeTab === 'resume' && (
              resumes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {resumes.map((resume) => (
                    <ResumeCard key={resume._id} resume={resume} onDelete={handleDeleteResume} />
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-white/10 bg-slate-950/60 p-10 text-center text-slate-400">
                  <h3 className="text-lg font-semibold text-white">Resume unavailable</h3>
                </div>
              )
            )}

            {activeTab === 'coverLetter' && (
              coverLetters.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {coverLetters.map((coverLetter) => (
                    <CoverLetterCard key={coverLetter._id} coverLetter={coverLetter} onDelete={handleDeleteCoverLetter} />
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-white/10 bg-slate-950/60 p-10 text-center text-slate-400">
                  <h3 className="text-lg font-semibold text-white">Cover letter unavailable</h3>
                </div>
              )
            )}
          </section>
        </div>
      </main>
    </div>
  )
}