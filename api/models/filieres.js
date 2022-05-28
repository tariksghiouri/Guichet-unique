/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('filieres', {
    'id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: "null"
    },
    'Intitule': {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "null"
    },
    'type_diplome': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'diplome',
        key: 'id'
      }
    }
  }, {
    tableName: 'filieres'
  });
};
