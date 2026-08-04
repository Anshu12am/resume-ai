const ai = require( "./gemini.service.js");

module.exports.analyzeResumeWithGemini = async(resume,jobDescription) =>{
  try{
    const prompt = `
You are an expert ATS (Applicant Tracking System) Resume Analyzer.

Compare the given resume with the job description.

Analyze the following:

1. ATS Score (0-100)
2. Keyword Match Percentage
3. Matched Keywords
4. Missing Keywords
5. Skills Analysis
6. Experience Analysis
7. Education Analysis
8. Projects Analysis
9. Resume Strengths
10. Resume Weaknesses
11. Suggestions to Improve ATS Score

Return ONLY valid JSON.

Example Format:

{
  "atsScore": 85,
  "keywordMatch": 80,
  "matchedKeywords": [],
  "missingKeywords": [],
  "strengths": [],
  "weaknesses": [],
  "skillsAnalysis": "",
  "experienceAnalysis": "",
  "educationAnalysis": "",
  "projectsAnalysis": "",
  "suggestions": []
}

Resume:

${JSON.stringify(resume, null, 2)}

Job Description:

${jobDescription}
`;
     const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
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