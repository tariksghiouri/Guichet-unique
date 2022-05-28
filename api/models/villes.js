/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('villes', {
    'id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: "null"
    },
    'Nom': {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "null"
    }
  }, {
    tableName: 'villes'
  });
};
