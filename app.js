const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/notesRoutes');

app.use('/api/user', authRoutes);
app.use('/api', noteRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to SwingNotes API' });
});

app.get('/api/test-error', (req, res, next) => {
  const error = new Error('Detta är ett testfel');
  error.statusCode = 418;
  next(error);
});

// 👇 Lägg till detta allra sist
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

module.exports = app;
