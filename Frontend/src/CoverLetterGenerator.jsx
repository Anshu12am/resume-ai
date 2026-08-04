import React from 'react'
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import { generateCoverLetter,getAllCoverLetters,getCoverLetterById } from './services/coverLetter.api'
import { getAllResumes } from './services/resume.api'
import toast from "react-hot-toast";



export default function CoverLetterGenerator() {
  
  const { id } = useParams();
  const [jobRole,setJobRole] = useState('');
  const [companyName, setCompanyName] = useState("");
  const [tone, setTone] = useState("Professional");
  const [resumeId, setResumeId] = useState("");
  const [resumes,setResumes] = useState([]);
  const [coverLetter, setCoverLetter] = useState("");
  const [coverLetters,setCoverLetters] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () =>{
    try{
      if (!resumeId) {
  toast.error("Please select a resume");
  return;
}
      setLoading(true);

      const response = await generateCoverLetter({
      jobRole,
      companyName,
      tone,
      resumeId,
      });
     console.log("FRONTEND RESPONSE:", response);
      setCoverLetter(response.data.content);
    }catch(error){
      console.error(error);
    }finally{
      setLoading(false);
    }
  }

  useEffect(() =>{
    const fetchResume = async () =>{
      try{
        const response = await getAllResumes();
        setResumes(response.data);
      }catch(error){
        console.error(error)
      }
    };
    fetchResume();
  },[])

  useEffect(()=>{
    const fetchLetters = async () =>{
      try{
        const response = await getAllCoverLetters();
        setCoverLetters(response.data);
      }catch(error){
        console.error(error)
      }
    };
    fetchLetters(); 
  },[])

  useEffect(()=>{
    if(!id) return;
    const fetchCoverLetter = async () =>{
      try{
      const response = await getCoverLetterById(id);

      const data = response.data;

      setJobRole(data.jobRole || "");
      setCompanyName(data.companyName || "");
      setTone(data.tone || "Professional");
      setResumeId(data.resumeId || "");

      // generated content
      setCoverLetter(data.content || "");
      }catch (error) {
      console.error("Error fetching cover letter:", error);
      toast.error("Failed to load cover letter");
    }
    };
    fetchCoverLetter();
  },[id])


  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050816] via-[#070521] to-[#050816] text-white overflow-x-hidden">
      <Sidebar />
      <Topbar />

      <main className="pt-20 md:ml-64 lg:ml-72 p-6">
        <div className="max-w-7xl mx-auto">
          <header className="mb-6">
            <h1 className="text-2xl font-semibold">Cover Letter Generator</h1>
            <p className="mt-1 text-sm subtle">Create personalized AI-powered cover letters for any job.</p>
          </header>

          <div className="space-y-6">
            <section className="rounded-xl border border-white/10 bg-slate-950/60 p-5">
              <h2 className="mb-4 text-lg font-semibold">Generate Cover Letter</h2>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm text-slate-300">Job Role</label>
                  <input value={jobRole} onChange={(e) => setJobRole(e.target.value)} placeholder="e.g. Frontend Developer"
                    className="w-full rounded-lg border border-white/10 bg-[#070b16] px-3 py-2.5 text-sm text-white outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-300">Company Name</label>
                  <input value={companyName} onChange={(e)=> setCompanyName(e.target.value)}
                    placeholder="e.g. Google"
                    className="w-full rounded-lg border border-white/10 bg-[#070b16] px-3 py-2.5 text-sm text-white outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-300">Tone</label>
                  <select value={tone}
  onChange={(e) => setTone(e.target.value)}        
                    className="w-full rounded-lg border border-white/10 bg-[#070b16] px-3 py-2.5 text-sm text-white outline-none"
                  >
                    <option value="Professional">Professional</option>
                    <option value="Friendly">Friendly</option>
                    <option value="Confident">Confident</option>
                    <option value="Formal">Formal</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-300">Base Resume</label>
                  <select value={resumeId}
  onChange={(e) => setResumeId(e.target.value)}             
                    className="w-full rounded-lg border border-white/10 bg-[#070b16] px-3 py-2.5 text-sm text-white outline-none"
                  >
                    <option value="">Select a resume</option>
                    {
                      resumes.map((resume)=>(
                        <option key={resume._id} value={resume._id}>{resume.title}</option>
                      ))
                    }
                   
                  </select>
                </div>

                <button onClick={handleGenerate}
                  disabled={loading}
                  className="w-full rounded-lg bg-gradient-to-r from-blue-400 to-purple-600 px-4 py-2.5 text-sm font-semibold text-black transition-all duration-300"
                >
                  {loading ?'Generating...':'Generate Cover Letter'}
                </button>
              </div>
            </section>

            <section className="rounded-xl border border-white/10 bg-slate-950/60 p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Generated Cover Letter</h2>
               {coverLetter && (
  <div className="flex items-center gap-2">
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(coverLetter);
        toast.success('Copied!');
      }}
      className="rounded-md bg-cyan-500/15 border border-cyan-400/30 px-3 py-1.5 text-sm font-medium text-cyan-200 hover:bg-cyan-500/25 transition-colors"
    >
      Copy
    </button>

    <button
      onClick={() => {
        toast.success('Saved!');
      }}
      className="rounded-md bg-cyan-500/15 border border-cyan-400/30 px-3 py-1.5 text-sm font-medium text-cyan-200 hover:bg-cyan-500/25 transition-colors"
    >
      Save
    </button>
  </div>
)}
  </div>
  <div className="min-h-[320px] rounded-lg border border-white/10 bg-[#070b16] p-4">
    {coverLetter ? (
      <div className="whitespace-pre-wrap text-sm leading-7 text-slate-200 font-sans">
        {coverLetter}
      </div>
    ) : (
      <p className="text-sm text-slate-400">
        Your generated cover letter will appear here.
      </p>
    )}
  </div>      
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
