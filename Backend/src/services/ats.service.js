const ai = require( "./gemini.service.js");

module.exports.analyzeResumeWithGemini = async(resume,jobDescription) =>{
  try{
    const prompt = `
You are an expert ATS (Applicant Tracking System) Resume Analyzer.

Analyze this resume against the job description.

Return ONLY valid JSON in this exact format:
{
  "atsScore": number,
  "keywordMatch": number,
  "matchedKeywords": [],
  "missingKeywords": [],
  "skillsAnalysis": "",
  "experienceAnalysis": "",
  "educationAnalysis": "",
  "projectsAnalysis": "",
  "strengths": [],
  "weaknesses": [],
  "suggestions": []
}

Resume:

${JSON.stringify(resume, null, 2)}

Job Description:

${jobDescription}
`;
     const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
     const text = response.text;


     const cleanedText = text
     .replace(/```json/g, "")
     .replace(/```/g, "")
     .trim();

     const result = JSON.parse(cleanedText);

     return result;
  }catch(error){
     console.error("Gemini ATS Error:", error);
    throw new Error("Failed to analyze ATS.");
  }
}