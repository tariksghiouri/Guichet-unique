/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('autres', {
    'id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: "null"
    },
    'type': {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "null"
    },
    'nom': {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "null"
    }
  }, {
    tableName: 'autres'
  });
};
