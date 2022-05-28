/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('matieres', {
    'id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: "null"
    },
    'NomMat': {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "null"
    },
    'filiere': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'filieres',
        key: 'id'
      }
    }
  }, {
    tableName: 'matieres'
  });
};
