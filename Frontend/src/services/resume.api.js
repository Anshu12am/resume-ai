import axios from "axios";

const api = axios.create({
  baseURL: 'https://resume-ai-api-z9af.onrender.com',
  timeout: 40000,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  console.log('TOKEN FROM STORAGE =>', token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export async function createResume({resumeData, title, atsAnalysis}) {
  try {
    const response = await api.post('/api/resume/create', {
      resumeData,
      title,
      atsAnalysis
    });
    return response.data;
  } catch (error) {
    console.error("Error creating resume:", error);
    throw error;
  }
};

export async function getAllResumes() {
  try{
    const response = await api.get('/api/resume/get');
    return response.data;
  }catch(error){
    console.error("Error fetching resumes:", error);
    throw error;
  }
}

export async function getResumeById(id){
  try{
    const response = await api.get(`/api/resume/get/${id}`);
    return response.data;
  }catch(error){
    console.error("Error fetching resume by ID:", error);
    throw error;
  }
}


export async function updateResumeById(id, {resumeData, title, atsAnalysis}){
  try{
    const response = await api.put(`/api/resume/update/${id}`,{
      resumeData,
      title,
      atsAnalysis
    })
    return response.data;
  }catch(error){
    console.error("Error updating resume:", error);
    throw error;
  }
}

export async function deleteResume(id) {
  try {
    const response = await api.delete(`/api/resume/delete/${id}`);

    return response.data;
  } catch (error) {
    console.error("Error deleting resume:", error);
    throw error;
  }
}