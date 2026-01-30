module.exports = (sequelize, DataTypes) => {
  const Proposal = sequelize.define('Proposal', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    organizationId: { type: DataTypes.INTEGER, allowNull: true },
    judul: { type: DataTypes.STRING, allowNull: false },
    deskripsi: { type: DataTypes.TEXT },
    status: { type: DataTypes.ENUM('pending','approved','rejected','revision'), defaultValue: 'pending' },
    dana_diajukan: { type: DataTypes.DECIMAL(12,2), defaultValue: 0 },
    tgl_pelaksanaan: { type: DataTypes.DATE, allowNull: true },
    organisasi: { type: DataTypes.STRING, allowNull: true },
    penanggung_jawab: { type: DataTypes.STRING, allowNull: true },
  });

  Proposal.associate = (models) => {
    Proposal.belongsTo(models.User, { foreignKey: 'userId' });
    Proposal.belongsTo(models.Organization, { foreignKey: 'organizationId' });
    Proposal.hasOne(models.ReportLPJ, { foreignKey: 'proposalId' });
  };

  return Proposal;
};
