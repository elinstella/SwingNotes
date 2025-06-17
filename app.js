const express = require('express');
const cors = require('cors');
const app = express();

// Viktigt: middleware först
app.use(cors());
app.use(express.json()); // ← Detta måste vara innan routes

// Routes
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/notesRoutes');

app.use('/api/user', authRoutes);
app.use('/api', noteRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to SwingNotes API' });
});

module.exports = app;
