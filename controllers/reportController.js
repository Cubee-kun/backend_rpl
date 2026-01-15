const { ReportLPJ, Proposal } = require('../models');

exports.uploadLPJ = async (req, res) => {
  try {
    const { proposalId, total_dana_terpakai } = req.body;
    if (!proposalId) return res.status(400).json({ message: 'proposalId required' });
    const proposal = await Proposal.findByPk(proposalId);
    if (!proposal) return res.status(404).json({ message: 'proposal not found' });
    if (proposal.userId !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ message: 'not allowed' });

    const file_url = req.files && req.files.reportFile ? req.files.reportFile[0].path : null;
    const bukti_transaksi_path = req.files && req.files.buktiFile ? req.files.buktiFile[0].path : null;

    const report = await ReportLPJ.create({
      proposalId,
      total_dana_terpakai: parseFloat(total_dana_terpakai) || 0,
      file_url,
      bukti_transaksi_path,
    });
    return res.json(report);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'server error' });
  }
};
