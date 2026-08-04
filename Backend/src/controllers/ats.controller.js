const { analyzeResumeWithGemini } = require("../services/ats.service.js");

module.exports.analyzeATS = async (req, res) => {
  try{
    const { resume, jobDescription } = req.body;

    if(!resume || !jobDescription){
       return res.status(400).json({
        success: false,
        message: "Resume and Job Description are required.",
      });
    }

    const analyze = await analyzeResumeWithGemini(resume, jobDescription);

    return res.status(200).json({
      success: true,
      message: "ATS analysis completed successfully.",
      data: analyze,
    });
  }catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}