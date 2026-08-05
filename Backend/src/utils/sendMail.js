const nodemailer = require('nodemailer');



const transporter = nodemailer.createTransport({
  service: 'gmail',  
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth:{
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
})

transporter.verify((error, success)=>{
  if(error){
    console.log("SMTP ERROR:", error);
  }
  else{
    console.log("SMTP SERVER READY");
  }
});

exports.sendOTP = async (email, otp) =>{
  
  try {
    await transporter.sendMail({
      from: `"Resume AI" <${process.env.EMAIL}>`,
      to: email,
      subject: "Your OTP Code",
      html: `
        <div style="font-family:sans-serif;">
          <h2>Your OTP Code</h2>
          <p>Your OTP is:</p>
          <h1>${otp}</h1>
          <p>This OTP will expire in 5 minutes.</p>
        </div>
      `
    });
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }

}