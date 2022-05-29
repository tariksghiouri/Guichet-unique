require('rootpath')();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('./_middleware/error-handler');

var homeRouter = require('./routes/home');
var bacRouter = require('./routes/bac');
var diplomesRouter = require('./routes/diplomes');
var curDateRouter = require('./routes/date');
var filsCRouter = require('./routes/filsC');
var filsPostulerRouter=require('./routes/filApostuler');
var userFormRouter=require('./routes/form');
var editFormRouter=require('./routes/editForm');
const initRoutes = require("./routes/fileRoute");
const etablissementRoute = require("./routes/EtablissementDeDiplome");
const candidatDataRoute = require("./routes/getCandidatData");
var cleanDataRoute = require("./routes/cleanCandidatData");
var AnneeUiversitaireRoute = require("./routes/AnneeUiversitaire");

global.__basedir = __dirname;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// allow cors requests from any origin and with credentials
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

// api routes
app.use('/accounts', require('./accounts/accounts.controller'));
app.use('/fils', homeRouter);
app.use('/bacs', bacRouter);
app.use('/diplomes', diplomesRouter);
app.use('/curDate', curDateRouter);
app.use('/filsC', filsCRouter);
app.use('/filspourpostuler', filsPostulerRouter);
app.use('/candidatData', userFormRouter);
app.use('/editCandidature', editFormRouter);
app.use('/etablissement', etablissementRoute);
app.use('/candidat', candidatDataRoute);
app.use('/listcandidat', cleanDataRoute);
app.use('/AnneeUiversitaire', AnneeUiversitaireRoute);
initRoutes(app);


// swagger docs route
app.use('/api-docs', require('./_helpers/swagger'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));
