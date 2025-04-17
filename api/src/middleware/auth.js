const secret_key = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');
const prisma = require('../db');

if (!secret_key) {
  throw new Error('JWT_SECRET environment variable is not defined');
}

module.exports = {
  generateToken: (payload) => {
    return jwt.sign(payload, secret_key, { expiresIn: '1d' });
  },

  verifyToken: (token) => {
    return jwt.verify(token, secret_key);
  },

  requireAuth: async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res
          .status(401)
          .json({ message: 'Unauthorized: No token provided' });
      }

      const token = authHeader.replace('Bearer ', '');
      const payload = jwt.verify(token, secret_key)

      const user = await prisma.user.findUnique({ where: { id: payload.id } });
      if (!user) {
        return res
          .status(401)
          .json({ message: 'Unauthorized: User not found' });
      }

      req.user = user;
      req.token = token;
      req.payload = payload;

      next();
    } catch (error) {
      console.error('Authorization error:', error);
      return res.status(401).json({
        error: 'Not authorized to access this resource',
      });
    }
  },
};
