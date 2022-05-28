/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('departement', {
    'id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: "null"
    },
    'NomDept': {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "null"
    },
    'abreviation': {
      type: DataTypes.STRING(10),
      allowNull: false,
      comment: "null"
    },
    'chef': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'staff',
        key: 'id'
      }
    },
    'etablissement_id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'etablissement',
        key: 'id'
      }
    }
  }, {
    tableName: 'departement'
  });
};
