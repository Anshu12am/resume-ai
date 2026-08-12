import axios from "axios";

const api = axios.create({
  baseURL: 'https://resume-ai-api-z9af.onrender.com',
  timeout: 10000,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export async function register({ email, password, confirmPassword }){

  try{
  const response = await api.post('/api/auth/register',{
    email, password, confirmPassword
  });
  return response.data;
}
catch(error){
  console.error("Error registering user:", error);
  throw error;
}
}

export async function login({email, password}){

  try{
    const response = await api.post('/api/auth/login',{
      email, password
    });
    return response.data;
  }catch(error){
  console.error("Error logging in user:", error);
  throw error;
  }
}

export async function getMe(){
  try{
    const response = await api.get('/api/auth/get-me')
    return response.data;
  }catch(error){
    console.error("Error fetching user data:", error);
    throw error;
  }
}


export async function verifyOTP({ email, otp }){
  try{
    const response = await api.post('/api/auth/verify-otp',{
      email,
      otp
    })
    return response.data;


  }catch(error){
    console.error("Error verifying OTP:", error);
    throw error;
  }
}

export async function logout(){
  try{
    const response = await api.post('/api/auth/logout')
    return response.data
  }catch(error){
    console.error("Error logging out user:", error)
    throw error
  }
}

