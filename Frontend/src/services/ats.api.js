import axios from "axios";

const api = axios.create({
  baseURL: 'https://resume-ai-api-z9af.onrender.com',
  timeout: 120000,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

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