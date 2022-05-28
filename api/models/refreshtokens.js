/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('refreshtokens', {
    'id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      primaryKey: true,
      comment: "null",
      autoIncrement: true
    },
    'token': {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "null"
    },
    'expires': {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "null"
    },
    'created': {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "null"
    },
    'createdByIp': {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "null"
    },
    'revoked': {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "null"
    },
    'revokedByIp': {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "null"
    },
    'replacedByToken': {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "null"
    },
    'accountId': {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: "null",
      references: {
        model: 'accounts',
        key: 'id'
      }
    }
  }, {
    tableName: 'refreshtokens'
  });
};
