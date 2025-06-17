const express = require('express');
const router = express.Router();
const {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  searchNotes
} = require('../controllers/notesController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/notes', authenticateToken, getNotes);
router.post('/notes', authenticateToken, createNote);
router.put('/notes', authenticateToken, updateNote);
router.delete('/notes', authenticateToken, deleteNote);
router.get('/notes/search', authenticateToken, searchNotes);

module.exports = router;
