module.exports = (sequelize, DataTypes) => {
  const Proposal = sequelize.define('Proposal', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    organizationId: { type: DataTypes.INTEGER, allowNull: true },
    judul: { type: DataTypes.STRING, allowNull: false },
    deskripsi: { type: DataTypes.TEXT },
    status: { type: DataTypes.ENUM('pending','disetujui','revisi','selesai'), defaultValue: 'pending' },
    dana_diajukan: { type: DataTypes.DECIMAL(12,2), defaultValue: 0 },
  });

  Proposal.associate = (models) => {
    Proposal.belongsTo(models.User, { foreignKey: 'userId' });
    Proposal.belongsTo(models.Organization, { foreignKey: 'organizationId' });
    Proposal.hasOne(models.ReportLPJ, { foreignKey: 'proposalId' });
  };

  return Proposal;
};
