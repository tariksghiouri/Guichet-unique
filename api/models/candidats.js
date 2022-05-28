/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('candidats', {
    'Numcondidature': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: "null"
    },
    'CIN': {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "null"
    },
    'CNE': {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "null"
    },
    'nomFr': {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "null"
    },
    'nomAr': {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "null"
    },
    'prenomFr': {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "null"
    },
    'prenomAr': {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "null"
    },
    'email': {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "null"
    },
    'DateDeNaissance': {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "null"
    },
    'LieuDeNaissance': {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "null"
    },
    'Adresse': {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "null"
    },
    'Tel': {
      type: DataTypes.STRING(10),
      allowNull: false,
      comment: "null"
    },
    'IntituleBAC': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'bac',
        key: 'id'
      }
    },
    'noteBac': {
      type: DataTypes.FLOAT,
      allowNull: false,
      comment: "null"
    },
    'Anneebac': {
      type: DataTypes.STRING(10),
      allowNull: false,
      comment: "null"
    },
    'DiplomeObtenu': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null"
    },
    'IntituleFiliere': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'filieres',
        key: 'id'
      }
    },
    'Etablissement': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'etablissement',
        key: 'id'
      }
    },
    'ville': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'villes',
        key: 'id'
      }
    },
    'MoyenneDiplome': {
      type: DataTypes.FLOAT,
      allowNull: false,
      comment: "null"
    },
    'AnneeDiplome': {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "null"
    },
    'choix1': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'filieredestination',
        key: 'id'
      }
    },
    'choix2': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'filieredestination',
        key: 'id'
      }
    }
  }, {
    tableName: 'candidats'
  });
};
