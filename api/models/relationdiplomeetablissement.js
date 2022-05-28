/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('relationdiplomeetablissement', {
    'idDiplome': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'diplome',
        key: 'id'
      }
    },
    'idEtablissement': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'etablissement',
        key: 'id'
      }
    }
  }, {
    tableName: 'relationdiplomeetablissement'
  });
};
