const { buildCoverLetter } = require("../services/coverLetter.service.js");
const Resume = require("../models/resume.model.js")
const CoverLetter = require("../models/coverLetter.model.js")


module.exports.generateCoverLetter = async(req,res) =>{
try{

  const {jobRole,
  companyName,
  tone,
  resumeId} = req.body;

  if (!resumeId) {
  return res.status(400).json({
    success: false,
    message: "Please select a resume before generating a cover letter."
  });
}

  const resume = await Resume.findById(resumeId);
 

  const p = resume.resumeData?.PersonalInfo || {};

  const resumeDataForAI = {
    name : p.name,
    email: p.email,
  phone: p.phone,
  summary: p.summary,
  education: resume.resumeData?.education || [],
  experience: resume.resumeData?.experience || [],
  skills: resume.resumeData?.skills || [],
  projects: resume.resumeData?.projects || [],
};

  const generatedCoverLetter = await buildCoverLetter({
  jobRole,
  companyName,
  tone,
  resume: resumeDataForAI,
  })

  
 

  const coverLetter = await CoverLetter.create({
    userId: req.user?._id || req.user?.id,
    resumeId,
    jobRole,
    companyName,
    tone,
    content: generatedCoverLetter,
  })

  return res.status(201).json({
     success:true,
      message:"Cover Letter created successfully",
      data:coverLetter
  })
}catch(err){

   console.error('COVER LETTER ERROR:', err);
     return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

module.exports.getAllCoverLetters = async ( req, res) =>{
  try{
    const userId = req.user.id;

    const coverLetters = await CoverLetter.find({ userId }).sort({ updatedAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Cover letters fetched successfully",
      data: coverLetters
    })
  }catch(err){
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
  
}

module.exports.getCoverLetterById = async ( req, res ) =>{
  
     try{
        const userId = req.user.id;
        const { id } = req.params;
    
        const coverLetter = await CoverLetter.findOne({
          _id:id,
          userId
        })
         if (!coverLetter) {
          return res.status(404).json({
            success: false,
            message: "Cover letter not found.",
          });
        }
    
        return res.status(200).json({
          success: true,
          data: coverLetter,
        });
      }catch(err){
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }
  
}

module.exports.deleteCoverLetterById = async (req,res) =>{
  try{
    const userId = req.user.id;
    const { id } = req.params;

    const deletedCoverLetter = await CoverLetter.findOneAndDelete({
      _id:id,
      userId
    })

    if(!deletedCoverLetter){
      return res.status(404).json({
        success: false,
        message: "Cover letter not found."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cover letter deleted successfully"
    });
  }catch(err){
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}
