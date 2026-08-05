import axios from "axios";

const api = axios.create({
  baseURL: 'https://resume-ai-api-z9af.onrender.com',
  withCredentials: true
})

export const analyzeATS = async(resume, jobDescription)=>{
  try{
  const response = await api.post('/api/ats/analyze',{
    resume,
    jobDescription
  });

  return response.data;
}catch(error){
  console.error("ATS Analysis Error:", error);
  throw error;
}
}