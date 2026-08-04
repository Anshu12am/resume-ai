const Resume = require('../models/resume.model');


module.exports.createResume = async (req, res) =>{
  try{
    const userId = req.user.id;

    const { title,resumeData,atsAnalysis } = req.body;


    const resume = await Resume.create({
      userId,
      title,
      resumeData,
      atsAnalysis
    });

    return res.status(201).json({
      success:true,
      message:"Resume created successfully",
      data:resume
    });
  }catch(err){
     return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

module.exports.getAllResumes = async (req, res) =>{
  try{
    const userId = req.user.id;

    const resumes = await Resume.find({ userId }).sort({ updatedAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Resumes fetched successfully",
      data: resumes
    })
  }catch(err){
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

module.exports.getResumeById = async (req, res) =>{
  try{
    const userId = req.user.id;
    const { id } = req.params;

    const resume = await Resume.findOne({
      _id:id,
      userId
    })
     if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: resume,
    });
  }catch(err){
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

module.exports.updateResumeById = async (req,res) =>{
  try{
    const userId = req.user.id;
    const { id } = req.params;

    const { title,resumeData,atsAnalysis } = req.body;

    const updatedResume = await Resume.findOneAndUpdate(
      {
        _id:id,
        userId
      },
      {
        title,
        resumeData,
        atsAnalysis
      },
      {
        new:true
      }
    );
    if(!updatedResume){
      return res.status(404).json({
        success: false,
        message: "Resume not found."
      });
    }
    return res.status(200).json({
      success: true,
      message: "Resume updated successfully",
      data: updatedResume
    });
  }catch(err){
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

module.exports.deleteResumeById = async (req,res) =>{
  try{
    const userId = req.user.id;
    const { id } = req.params;

    const deletedResume = await Resume.findOneAndDelete({
      _id:id,
      userId
    })

    if(!deletedResume){
      return res.status(404).json({
        success: false,
        message: "Resume not found."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Resume deleted successfully"
    });
  }catch(err){
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}
