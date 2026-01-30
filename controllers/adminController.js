const { Proposal, ReportLPJ, User } = require('../models');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

exports.dashboard = async (req, res) => {
  try {
    const totalProposals = await Proposal.count();
    const activeProposals = await Proposal.findAll({ where: { status: { [Op.not]: 'selesai' } } });
    const totalDanaTerserapRow = await ReportLPJ.findAll({ attributes: [[ReportLPJ.sequelize.fn('SUM', ReportLPJ.sequelize.col('total_dana_terpakai')), 'total'] ] });
    const totalDanaTerserap = totalDanaTerserapRow[0].get('total') || 0;

    return res.json({ totalProposals, totalDanaTerserap, activeProposals });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'server error' });
  }
};

exports.updateProposalStatus = async (req, res) => {
  try {
    const { proposalId } = req.params;
    const { status } = req.body;
    if (!['pending','disetujui','revisi','selesai'].includes(status)) return res.status(400).json({ message: 'invalid status' });
    const proposal = await Proposal.findByPk(proposalId);
    if (!proposal) return res.status(404).json({ message: 'proposal not found' });
    proposal.status = status;
    await proposal.save();
    return res.json(proposal);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'server error' });
  }
};

// User Management Controllers
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'email', 'full_name', 'role', 'createdAt', 'updatedAt'],
      order: [['createdAt', 'DESC']]
    });
    return res.json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { username, email, full_name, role, password } = req.body;
    
    // Validation
    if (!username || !email || !full_name || !role || !password) {
      return res.status(400).json({ message: 'Semua field wajib diisi' });
    }
    
    if (!['admin', 'organisasi', 'publik'].includes(role)) {
      return res.status(400).json({ message: 'Role tidak valid' });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }]
      }
    });
    
    if (existingUser) {
      return res.status(400).json({ message: 'Username atau email sudah digunakan' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = await User.create({
      username,
      email,
      full_name,
      role,
      password: hashedPassword
    });
    
    // Return user without password
    const { password: _, ...userWithoutPassword } = user.toJSON();
    return res.status(201).json(userWithoutPassword);
    
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, email, full_name, role, password } = req.body;
    
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }
    
    // Check for duplicate username/email (except current user)
    if (username || email) {
      const existingUser = await User.findOne({
        where: {
          id: { [Op.not]: userId },
          [Op.or]: [
            ...(username ? [{ username }] : []),
            ...(email ? [{ email }] : [])
          ]
        }
      });
      
      if (existingUser) {
        return res.status(400).json({ message: 'Username atau email sudah digunakan' });
      }
    }
    
    // Update fields
    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (full_name) updateData.full_name = full_name;
    if (role && ['admin', 'organisasi', 'publik'].includes(role)) updateData.role = role;
    if (password) updateData.password = await bcrypt.hash(password, 10);
    
    await user.update(updateData);
    
    // Return updated user without password
    const { password: _, ...userWithoutPassword } = user.toJSON();
    return res.json(userWithoutPassword);
    
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }
    
    // Prevent admin from deleting themselves
    if (user.id === req.user.id) {
      return res.status(400).json({ message: 'Tidak dapat menghapus akun sendiri' });
    }
    
    await user.destroy();
    return res.json({ message: 'User berhasil dihapus' });
    
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get all proposals for admin
exports.getAllProposals = async (req, res) => {
  try {
    const proposals = await Proposal.findAll({
      include: [{
        model: User,
        attributes: ['id', 'username', 'full_name', 'email']
      }],
      order: [['createdAt', 'DESC']]
    });
    return res.json(proposals);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get all reports for admin
exports.getAllReports = async (req, res) => {
  try {
    const reports = await ReportLPJ.findAll({
      include: [{
        model: Proposal,
        include: [{
          model: User,
          attributes: ['id', 'username', 'full_name', 'email']
        }]
      }],
      order: [['createdAt', 'DESC']]
    });
    return res.json(reports);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
