module.exports = (sequelize, DataTypes) => {
  const ReportLPJ = sequelize.define('ReportLPJ', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    proposalId: { type: DataTypes.INTEGER, allowNull: false },
    total_dana_terpakai: { type: DataTypes.DECIMAL(12,2), defaultValue: 0 },
    file_url: { type: DataTypes.STRING },
    bukti_transaksi_path: { type: DataTypes.STRING },
  });

  ReportLPJ.associate = (models) => {
    ReportLPJ.belongsTo(models.Proposal, { foreignKey: 'proposalId' });
  };

  return ReportLPJ;
};
