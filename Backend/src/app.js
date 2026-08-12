const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://resume-ai-beta-two.vercel.app'
  ]
}));

const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

const atsRoutes = require('./routes/ats.routes');
app.use('/api/ats', atsRoutes);

const resumeRoutes = require('./routes/resume.routes');
app.use('/api/resume', resumeRoutes);

const coverLetterRoutes = require('./routes/coverLetter.routes')
app.use('/api/coverLetter', coverLetterRoutes)


module.exports = app;