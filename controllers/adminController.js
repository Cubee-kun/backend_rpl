const { Proposal, ReportLPJ } = require('../models');
const { Op } = require('sequelize');

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
