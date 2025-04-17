const prisma = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { generateToken } = require('../middleware/auth');

module.exports = {
  signin: async (req, res, next) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(401).json({
        message: 'User is not found',
      });
    }

    const isPasswordValid = await bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({
        message: 'Invalid password',
      });
    }

    const token = generateToken({ id: user.id, email: user.email });

    res.status(200).json({ 
      token, 
      user: { id: user.id, email: user.email },
      message: 'Success login'
    });
  },
};
