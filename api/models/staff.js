/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('staff', {
    'id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: "null"
    },
    'NomComplet': {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "null"
    },
    'email': {
      type: DataTypes.STRING(30),
      allowNull: false,
      comment: "null"
    },
    'password': {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "null"
    },
    'roleId': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'roles',
        key: 'role_id'
      }
    }
  }, {
    tableName: 'staff'
  });
};
