module.exports = (err, req, res, next) => {
    console.error('💥 Fel fångat:', err);
  
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internt serverfel';
  
    res.status(statusCode).json({ message });
  };
  