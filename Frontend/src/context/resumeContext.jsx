import { createContext, useContext, useState} from 'react'
import { createResume, updateResumeById } from '../services/resume.api'
import toast from "react-hot-toast";

const ResumeContext = createContext()

export const initialResumeData = {
    PersonalInfo: {
      name: "",
      email: "",
      phone: "",
      address: "",
      linkedin: "",
      website: "",
      summary: "",
      photo: "",
    },

    education: [
      {
        school: "",
        degree: "",
        field: "",
        startDate: "",
        endDate: "",
      },
    ],

    experience: [
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],

    skills: [],

    projects: [
      {
        projectName: "",
        technologies: "",
        description: "",
        link: "",
      },
    ],
  }

export const ResumeProvider = ({children}) =>{
  
const [resumeData, setResumeData] = useState(initialResumeData);

const [jobDescription, setJobDescription] = useState("");

const [analysis, setAnalysis] = useState(null);

const [resumeId, setResumeId] = useState(null);

 const handleSaveResume = async () => {
    try {
      if (!analysis) {
        toast.error("Please analyze your resume before saving.");
        return;
      }

      if(resumeId){
        const response = await updateResumeById(resumeId, {
          title: resumeData.PersonalInfo.name || "Untitled Resume",
          resumeData,
          atsAnalysis: analysis,
        });

        toast.success("Resume updated successfully!");

        return response;
      }
      else{
      const response = await createResume({
        title: resumeData.PersonalInfo.name || "Untitled Resume",
        resumeData,
        atsAnalysis: analysis,
      });

      toast.success("Resume saved successfully!");

      return response;

    }
    } catch (error) {
      console.error(error);
      toast.error("Failed to save resume.");
    }
  };

return (
   <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,

        resumeId,
        setResumeId,

        jobDescription,
        setJobDescription,

        analysis,
        setAnalysis,
        handleSaveResume,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );

}

export const useResume = () => useContext(ResumeContext);




