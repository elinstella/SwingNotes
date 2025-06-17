const { Op } = require('sequelize');
const Note = require('../models/Note');

exports.getNotes = async (req, res, next) => {
  try {
    const notes = await Note.findAll({
      where: { userId: req.user.userId },
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json(notes);
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    next(err);
  }
};

exports.createNote = async (req, res, next) => {
  try {
    const { title, text } = req.body;

    if (!title || !text) {
      const error = new Error('Titel och text krävs');
      error.statusCode = 400;
      throw error;
    }

    if (title.length > 50 || text.length > 300) {
      const error = new Error('Titel eller text överskrider maxlängd');
      error.statusCode = 400;
      throw error;
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
    err.statusCode = err.statusCode || 500;
    next(err);
  }
};

exports.updateNote = async (req, res, next) => {
  try {
    const { id, title, text } = req.body;

    if (!id || !title || !text) {
      const error = new Error('ID, titel och text krävs');
      error.statusCode = 400;
      throw error;
    }

    const note = await Note.findOne({
      where: { id, userId: req.user.userId }
    });

    if (!note) {
      const error = new Error('Anteckning hittades inte');
      error.statusCode = 404;
      throw error;
    }

    note.title = title;
    note.text = text;
    note.modifiedAt = new Date();

    await note.save();
    res.status(200).json(note);
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    next(err);
  }
};

exports.deleteNote = async (req, res, next) => {
  try {
    const { id } = req.body;

    if (!id) {
      const error = new Error('ID krävs för att radera');
      error.statusCode = 400;
      throw error;
    }

    const note = await Note.findOne({
      where: { id, userId: req.user.userId }
    });

    if (!note) {
      const error = new Error('Anteckning hittades inte');
      error.statusCode = 404;
      throw error;
    }

    await note.destroy();
    res.status(200).json({ message: 'Anteckning raderad' });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    next(err);
  }
};

exports.searchNotes = async (req, res, next) => {
  try {
    const { title } = req.query;

    if (!title) {
      const error = new Error('Sökord saknas');
      error.statusCode = 400;
      throw error;
    }

    const notes = await Note.findAll({
      where: {
        userId: req.user.userId,
        title: { [Op.iLike]: `%${title}%` }
      }
    });

    res.status(200).json(notes);
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    next(err);
  }
};
