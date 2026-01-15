module.exports = (sequelize, DataTypes) => {
  const Organization = sequelize.define('Organization', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nama_org: { type: DataTypes.STRING, allowNull: false },
    deskripsi: { type: DataTypes.TEXT },
  });

  Organization.associate = (models) => {
    Organization.hasMany(models.Proposal, { foreignKey: 'organizationId' });
  };

  return Organization;
};
