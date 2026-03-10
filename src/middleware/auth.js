const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    
    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretkey123');
    req.user = decoded; // Attach user info (id, etc) to request
    next();
  } catch (err) {
    res.status(401).json({ error: 'Please authenticate.' });
  }
};

module.exports = auth;
