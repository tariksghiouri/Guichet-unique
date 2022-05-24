// var express = require('express');
// var router = express.Router();
// const { Sequelize } = require('sequelize')

// const candidats = require(`../models/candidats`)(Sequelize)

// // @ts-ignore

// router.post('/', (req, res) => {
//     if (!req.body.user) {
//         res.json({ success: false, message: 'no user id' });
//     } else {
//         const candidat = new candidats({
//             Numcondidature: Number(req.body.user),
//             CIN: req.body.personelinfos.cin,
//             CNE: req.body.personelinfos.cne,
//             nomFr: req.body.personelinfos.nomFr,
//             nomAr: req.body.personelinfos.nomAr,
//             prenomFr: req.body.personelinfos.prenomFr,
//             prenomAr: req.body.personelinfos.prenomAr,
//             email: req.body.personelinfos.email,
//             DateDeNaissance: req.body.personelinfos.datenaiss,
//             LieuDeNaissance: req.body.personelinfos.LieuDeNaissance,
//             Adresse: req.body.address,
//             Tel: req.body.personelinfos.phone,
//             IntituleBAC: req.body.education.bac.id,
//             DiplomeObtenu: req.body.education.diplome.id,
//             IntituleFiliere: req.body.education.filC.id,
//             Moyenne1année: req.body.education.notediplo,
//             Moyenne2année: req.body.education.notediplo,
//             MoyenneDiplome: req.body.education.notediplo,
//             AnnéeDiplome: req.body.education.annediplo,
//             choix1: req.body.choices.filterN1.id,
//             choix2: req.body.choices.filterN2.id
//         });
//         candidat.save((err) => {
//             if (err) {
//                 if (err.errors) {
//                     res.json({ success: false, message: err });
//                 }
//             } else {
//                 res.json({ success: true, message: 'candidat Saved !' });
//             }
//         });
//     }
// }

// );


// module.exports = router;