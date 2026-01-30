const { Proposal, User } = require('../models');

exports.createProposal = async (req, res) => {
  try {
    // Only organisasi role can create proposals
    if (req.user.role !== 'organisasi') {
      return res.status(403).json({ message: 'Only organisasi can submit proposals' });
    }
    
    const { judul, deskripsi, dana_diajukan, tgl_pelaksanaan, organisasi, penanggung_jawab } = req.body;
    if (!judul) return res.status(400).json({ message: 'judul is required' });
    const dana = parseFloat(dana_diajukan) || 0;
    const proposal = await Proposal.create({
      userId: req.user.id,
      judul,
      deskripsi,
      dana_diajukan: dana,
      tgl_pelaksanaan,
      organisasi,
      penanggung_jawab,
      status: 'pending'
    });
    return res.json(proposal);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'server error' });
  }
};

exports.listUserProposals = async (req, res) => {
  try {
    const proposals = await Proposal.findAll({ 
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });
    return res.json(proposals);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'server error' });
  }
};

// Admin functions
exports.listAllProposals = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
    const proposals = await Proposal.findAll({
      include: [{
        model: User,
        attributes: ['username', 'role']
      }],
      order: [['createdAt', 'DESC']]
    });
    return res.json(proposals);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'server error' });
  }
};

exports.updateProposalStatus = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
    const { id } = req.params;
    const { status, admin_notes } = req.body;
    
    if (!['approved', 'rejected', 'revision'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    
    await Proposal.update(
      { status, admin_notes, reviewed_at: new Date() },
      { where: { id } }
    );
    
    const proposal = await Proposal.findByPk(id, {
      include: [{ model: User, attributes: ['username'] }]
    });
    
    return res.json(proposal);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'server error' });
  }
};
