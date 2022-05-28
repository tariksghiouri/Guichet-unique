/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('filieredestination', {
    'id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: "null"
    },
    'Intitule': {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "null"
    },
    'capaciteMax': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null"
    },
    'coordonnateur': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'staff',
        key: 'id'
      }
    },
    'Id_Departement': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'departement',
        key: 'id'
      }
    }
  }, {
    tableName: 'filieredestination'
  });
};
