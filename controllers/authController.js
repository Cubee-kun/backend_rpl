const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'username and password required' });
    const existing = await User.findOne({ where: { username } });
    if (existing) return res.status(400).json({ message: 'username exists' });
    const hashed = await bcrypt.hash(password, 8);
    const user = await User.create({ username, password: hashed, role: role || 'publik' });
    return res.json({ id: user.id, username: user.username, role: user.role });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'username and password required' });
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(400).json({ message: 'invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'invalid credentials' });
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET || 'change_this_secret', { expiresIn: '8h' });
    return res.json({ 
      token, 
      user: { 
        id: user.id, 
        username: user.username, 
        email: user.email,
        full_name: user.full_name,
        role: user.role 
      } 
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'server error' });
  }
};
