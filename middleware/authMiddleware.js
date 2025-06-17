const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Kolla om Authorization-header finns och börjar med "Bearer"
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Ingen token. Åtkomst nekad.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // spara userId i req.user
    next();
  } catch (err) {
    console.error(err);
    return res.status(403).json({ message: 'Ogiltig token' });
  }
};

module.exports = authenticateToken;
