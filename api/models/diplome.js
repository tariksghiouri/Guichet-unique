/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('diplome', {
    'id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: "null"
    },
    'Intitule': {
      type: DataTypes.STRING(60),
      allowNull: false,
      comment: "null"
    },
    'abreviation': {
      type: DataTypes.STRING(10),
      allowNull: false,
      comment: "null"
    },
    'type': {
      type: DataTypes.INTEGER(50),
      allowNull: false,
      comment: "null"
    }
  }, {
    tableName: 'diplome'
  });
};
