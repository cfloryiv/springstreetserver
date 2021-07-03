/* eslint-disable no-param-reassign */
const express = require('express');
const apptsController = require('../controllers/apptsController');
const addressesController = require('../controllers/addressesController');
const proceduresController = require('../controllers/proceduresController');
const insurancesController = require('../controllers/insurancesController');
const billsController = require('../controllers/billsController');

function routes({Appt, Address, Procedure, Insurance, Bill}) {
  const apptRouter = express.Router();
  const controller = apptsController(Appt);
  const addressescontroller = addressesController(Address);
  const procedurescontroller=proceduresController(Procedure);
  const insurancescontroller=insurancesController(Insurance);
  const billscontroller=billsController(Bill);

  apptRouter.route('/addresses')
  .post(addressescontroller.post)
  .get(addressescontroller.get);

  apptRouter.route('/addresses/:Id')
  .put(addressescontroller.put);

  apptRouter.route('/procedures')
  .post(procedurescontroller.post)
  .get(procedurescontroller.get);

  apptRouter.route('/bills')
  .post(billscontroller.post)
  .get(billscontroller.get);

  apptRouter.route('/insurances')
  .post(insurancescontroller.post)
  .get(insurancescontroller.get);

  apptRouter.route('/insurances')
  .put(insurancescontroller.put);

  apptRouter.route('/appts')
    .post(controller.post)
    .get(controller.get);
  apptRouter.use('/appts/:apptId', (req, res, next) => {
    Appt.findById(req.params.apptId, (err, appt) => {
      if (err) {
        return res.send(err);
      }
      if (appt) {
        req.appt = appt;
        return next();
      }
      return res.sendStatus(404);
    });
  });
  apptRouter.route('/appts/:apptId')
    .get((req, res) => {
      const returnAppt = req.appt.toJSON();

      returnAppt.links = {};
      const genre = req.appt.genre.replace(' ', '%20');
      returnAppt.links.FilterByThisGenre = `http://${req.headers.host}/api/appts/?genre=${genre}`;
      res.json(returnAppt);
    })
    .put((req, res) => {
      const { appt } = req;
      appt.title = req.body.title;
      appt.author = req.body.author;
      appt.genre = req.body.genre;
      appt.read = req.body.read;
      req.appt.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(appt);
      });
    })
    .patch((req, res) => {
      const { appt } = req;
      // eslint-disable-next-line no-underscore-dangle
      if (req.body._id) {
        // eslint-disable-next-line no-underscore-dangle
        delete req.body._id;
      }
      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        appt[key] = value;
      });
      req.appt.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(appt);
      });
    })
    .delete((req, res) => {
      req.appt.remove((err) => {
        if (err) {
          return res.send(err);
        }
        return res.sendStatus(204);
      });
    });
  return apptRouter;
}

module.exports = routes;
