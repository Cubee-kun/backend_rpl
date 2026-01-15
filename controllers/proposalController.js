const { Proposal } = require('../models');

exports.createProposal = async (req, res) => {
  try {
    const { judul, deskripsi, dana_diajukan, organizationId } = req.body;
    if (!judul) return res.status(400).json({ message: 'judul is required' });
    const dana = parseFloat(dana_diajukan) || 0;
    const proposal = await Proposal.create({
      userId: req.user.id,
      organizationId: organizationId || null,
      judul,
      deskripsi,
      dana_diajukan: dana,
    });
    return res.json(proposal);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'server error' });
  }
};

exports.listUserProposals = async (req, res) => {
  try {
    const proposals = await Proposal.findAll({ where: { userId: req.user.id } });
    return res.json(proposals);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'server error' });
  }
};
