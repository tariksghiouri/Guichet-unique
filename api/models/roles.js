/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('roles', {
    'role_id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: "null"
    },
    'NomRole': {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "null"
    },
    'description': {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "null"
    }
  }, {
    tableName: 'roles'
  });
};
