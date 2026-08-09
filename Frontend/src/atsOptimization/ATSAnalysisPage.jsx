import { useResume } from '../context/resumeContext.jsx';
import {
  Gauge,
  Target,
  CheckCircle2,
  XCircle,
  Code2,
  Briefcase,
  GraduationCap,
  FolderKanban,
  Lightbulb
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CircularProgress = ({ value }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Number(value) / 100) * circumference;

  return (
    
    <div className="flex flex-col items-center">
      <div className="relative flex h-40 w-40 items-center justify-center">
        <svg className="h-40 w-40 -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={radius} stroke="#0f172a" strokeWidth="10" fill="none" />
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="url(#g)"
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
          <defs>
            <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute text-center">
          <p className="text-3xl font-bold text-white">{value}%</p>
          <p className="mt-1 text-sm text-slate-300">Overall</p>
        </div>
      </div>
    </div>
  );
};

const AnalysisCard = ({ Icon, title, text }) => (
  <div className="rounded-[20px] border p-8 bg-[#111827] border-[#1f2937] shadow-[0_30px_80px_rgba(2,6,23,0.6)]">
    <div className="flex items-start gap-4">
      <div className="rounded-md bg-white/3 p-3 text-cyan-300">
        <Icon size={20} />
      </div>
      <div>
        <h4 className="text-lg font-semibold text-white">{title}</h4>
        <p className="mt-3 text-sm text-slate-300">{text}</p>
      </div>
    </div>
  </div>
);

const ATSAnalysisPage = () => {
  
  const { analysis, handleSaveResume } = useResume();
  const navigate = useNavigate();

  // Dummy backend-shaped data (UI only, no logic)
  const atsScore = analysis?.atsScore || 0; // backend field: atsScore
  const keywordMatch = analysis?.keywordMatch || 0; // backend field: keywordMatch
  const matchedKeywords = analysis?.matchedKeywords || []; // backend field: matchedKeywords
  const missingKeywords = analysis?.missingKeywords || []; // backend field: missingKeywords

  const skillsAnalysis = analysis?.skillsAnalysis || ""; // backend field
  const experienceAnalysis = analysis?.experienceAnalysis ||""; // backend field
  const educationAnalysis = analysis?.educationAnalysis || ""; // backend field
  const projectsAnalysis = analysis?.projectsAnalysis || ""; // backend field

  const strengths = analysis?.strengths || []; // backend field
  const weaknesses = analysis?.weaknesses || []; // backend field

  const suggestions = analysis?.suggestions || []; // backend field

  return (
    
    <div className="min-h-screen bg-[#020617] text-slate-100 py-16">
      <div className="mx-auto max-w-6xl px-6">
        {/* Top Center: badge, heading, subtitle */}
        <div className="mb-12 text-center">
          <div className="flex justify-start">
            <button className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/10">
              
              <button onClick={()=>navigate('/resume-builder')}>Back</button>
            </button>
          </div>
          <div className="mx-auto inline-flex items-center justify-center rounded-full bg-white/3 px-4 py-1 text-sm font-medium text-cyan-300">AI Powered Analysis</div>
          <h1 className="mt-6 text-4xl font-extrabold text-white">ATS Resume Analysis</h1>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-300">Compare your resume with the job description and improve your ATS compatibility.</p>
          <div className="mt-8 flex justify-center">
            <button onClick={handleSaveResume} className="bg-green-600 hover:brightness-105 text-white rounded-xl px-4 py-2">Save</button>
          </div>
        </div>

        {/* SECTION 1 - Two large centered cards */}
        <section className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex items-center justify-center">
            <div className="w-full max-w-lg rounded-[20px] border bg-[#111827] border-[#1f2937] p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-wider text-slate-300">ATS SCORE</p>
                  <p className="mt-2 text-xl font-semibold text-white">Overall Score</p>
                </div>
                <div className="text-cyan-300">
                  <Gauge size={28} />
                </div>
              </div>
              <div className="mt-8 flex items-center justify-center">
                <CircularProgress value={atsScore} />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full max-w-lg rounded-[20px] border bg-[#111827] border-[#1f2937] p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-wider text-slate-300">KEYWORD MATCH</p>
                  <p className="mt-2 text-xl font-semibold text-white">Keywords Matched</p>
                </div>
                <div className="text-indigo-300">
                  <Target size={28} />
                </div>
              </div>
              <div className="mt-8 flex items-center justify-center">
                <CircularProgress value={keywordMatch} />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 - Matched / Missing Keywords */}
        <section className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-[20px] border bg-[#111827] border-[#1f2937] p-8">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Matched Keywords</h3>
              <div className="text-emerald-300">
                <CheckCircle2 size={20} />
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-6">
              {matchedKeywords.map((k) => (
                <span key={k} className="rounded-full bg-emerald-800/30 px-4 py-2 text-sm font-medium text-emerald-300 border border-emerald-700">
                  {k}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[20px] border bg-[#111827] border-[#1f2937] p-8">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Missing Keywords</h3>
              <div className="text-rose-300">
                <XCircle size={20} />
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-6">
              {missingKeywords.map((k) => (
                <span key={k} className="rounded-full bg-rose-900/30 px-4 py-2 text-sm font-medium text-rose-300 border border-rose-700">
                  {k}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3 - Detailed Analysis (4 equal cards) */}
        <section className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <AnalysisCard Icon={Code2} title="Skills Analysis" text={skillsAnalysis} />
          <AnalysisCard Icon={Briefcase} title="Experience Analysis" text={experienceAnalysis} />
          <AnalysisCard Icon={GraduationCap} title="Education Analysis" text={educationAnalysis} />
          <AnalysisCard Icon={FolderKanban} title="Projects Analysis" text={projectsAnalysis} />
        </section>

        {/* SECTION 4 - Strengths & Weaknesses */}
        <section className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-[20px] border bg-[#111827] border-[#1f2937] p-8">
            <div className="flex items-center gap-4">
              <div className="rounded-md bg-emerald-800/20 p-3 text-emerald-300">
                <CheckCircle2 size={20} />
              </div>
              <h4 className="text-lg font-semibold text-white">Resume Strengths</h4>
            </div>
            <ul className="mt-6 space-y-4">
              {strengths.map((s) => (
                <li key={s} className="flex items-start gap-3 text-slate-200">
                  <span className="mt-1 text-emerald-300">✔</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[20px] border bg-[#111827] border-[#1f2937] p-8">
            <div className="flex items-center gap-4">
              <div className="rounded-md bg-rose-800/20 p-3 text-rose-300">
                <XCircle size={20} />
              </div>
              <h4 className="text-lg font-semibold text-white">Resume Weaknesses</h4>
            </div>
            <ul className="mt-6 space-y-4">
              {weaknesses.map((w) => (
                <li key={w} className="flex items-start gap-3 text-slate-200">
                  <span className="mt-1 text-rose-300">✖</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* SECTION 5 - Suggestions (full width) */}
        <section className="mb-24">
          <div className="rounded-[20px] border bg-[#111827] border-[#1f2937] p-8">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Suggestions to Improve ATS Score</h3>
              <div className="text-cyan-300">
                <Lightbulb size={20} />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              {suggestions.map((s, idx) => (
                <div key={s} className="rounded-xl border bg-[#0f172a] border-[#1f2937] p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-cyan-900 text-cyan-300">{idx + 1}</div>
                    <div>
                      <p className="text-sm font-medium text-white">{s}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ATSAnalysisPage;
