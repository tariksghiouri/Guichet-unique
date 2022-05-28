/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('etablissement', {
    'id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: "null"
    },
    'Nom': {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "null"
    },
    'abreviation': {
      type: DataTypes.STRING(10),
      allowNull: false,
      comment: "null"
    },
    'ville_id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'villes',
        key: 'id'
      }
    }
  }, {
    tableName: 'etablissement'
  });
};
