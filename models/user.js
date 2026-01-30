module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('admin','organisasi','publik'), allowNull: false, defaultValue: 'publik' },
    full_name: { type: DataTypes.STRING, allowNull: true },
  });

  User.associate = (models) => {
    User.hasMany(models.Proposal, { foreignKey: 'userId' });
  };

  return User;
};
