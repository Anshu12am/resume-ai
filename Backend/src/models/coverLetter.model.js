const mongoose = require('mongoose')

const coverLetterSchema = new mongoose.Schema({
  userId:{
     type: mongoose.Schema.Types.ObjectId,
     ref:"User",
     required:true
    },
    resumeId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resume",
    },
    jobRole:{
      type:String,
      required:true
    },
    companyName:{
      type:String,
      required:true
    },
    tone:{
      type:String,
      enum: ["Professional","Friendly","Confident","Formal"],
      required:true
    },
    content:{
      type:String,
      required:true
    },

},
{
      timestamps: true,
    }
  )

module.exports = mongoose.model("CoverLetter",coverLetterSchema)