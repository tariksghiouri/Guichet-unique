/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('relationfilieres', {
    'idFilcandidat': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: "null",
      references: {
        model: 'filieres',
        key: 'id'
      }
    },
    'idFilLp': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: "null",
      references: {
        model: 'filieredestination',
        key: 'id'
      }
    }
  }, {
    tableName: 'relationfilieres'
  });
};
