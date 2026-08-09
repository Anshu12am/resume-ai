const groq = require('./groq.service');

module.exports.analyzeResumeWithGemini = async (resume, jobDescription) => {
  const prompt = `
Analyze this resume against the job description.

Return ONLY valid JSON:
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
${JSON.stringify(resume)}

Job Description:
${jobDescription}
`;

  const completion = await groq.chat.completions.create({
    model: 'llama-3.1-8b-instant',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.2,
  });

  const text = completion.choices[0].message.content;

  const cleaned = text
    .replace(/```json/g, '')
    .replace(/```/g, '')
    .trim();

  return JSON.parse(cleaned);
};