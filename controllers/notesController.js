const { Op } = require('sequelize');
const Note = require('../models/Note');

exports.getNotes = async (req, res) => {
  try {
    console.log('GET req.user:', req.user);
    const notes = await Note.findAll({
      where: { userId: req.user.userId },
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json(notes);
  } catch (err) {
    console.error('GET error:', err);
    res.status(500).json({ message: 'Kunde inte hämta anteckningar' });
  }
};

exports.createNote = async (req, res) => {
  try {
    const { title, text } = req.body;

    if (!title || !text) {
      return res.status(400).json({ message: 'Titel och text krävs' });
    }

    if (title.length > 50 || text.length > 300) {
      return res.status(400).json({ message: 'Titel eller text överskrider maxlängd' });
    }

    const note = await Note.create({
      title,
      text,
      userId: req.user.userId,
      createdAt: new Date(),
      modifiedAt: new Date()
    });

    res.status(201).json(note);
  } catch (err) {
    console.error('CREATE error:', err);
    res.status(500).json({ message: 'Kunde inte skapa anteckning' });
  }
};

exports.updateNote = async (req, res) => {
  try {
    console.log('UPDATE req.user:', req.user);
    const { id, title, text } = req.body;

    if (!id || !title || !text) {
      return res.status(400).json({ message: 'ID, titel och text krävs' });
    }

    const note = await Note.findOne({
      where: { id, userId: req.user.userId }
    });

    if (!note) return res.status(404).json({ message: 'Anteckning hittades inte' });

    note.title = title;
    note.text = text;
    note.modifiedAt = new Date();

    await note.save();
    res.status(200).json(note);
  } catch (err) {
    console.error('UPDATE error:', err);
    res.status(500).json({ message: 'Kunde inte uppdatera anteckning' });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    console.log('DELETE req.user:', req.user);
    const { id } = req.body;

    if (!id) return res.status(400).json({ message: 'ID krävs för att radera' });

    const note = await Note.findOne({
      where: { id, userId: req.user.userId }
    });

    if (!note) return res.status(404).json({ message: 'Anteckning hittades inte' });

    await note.destroy();
    res.status(200).json({ message: 'Anteckning raderad' });
  } catch (err) {
    console.error('DELETE error:', err);
    res.status(500).json({ message: 'Kunde inte ta bort anteckning' });
  }
};

exports.searchNotes = async (req, res) => {
  try {
    console.log('SEARCH req.user:', req.user);
    const { title } = req.query;
    if (!title) return res.status(400).json({ message: 'Sökord saknas' });

    const notes = await Note.findAll({
      where: {
        userId: req.user.userId,
        title: { [Op.iLike]: `%${title}%` }
      }
    });

    res.status(200).json(notes);
  } catch (err) {
    console.error('SEARCH error:', err);
    res.status(500).json({ message: 'Kunde inte söka anteckningar' });
  }
};
