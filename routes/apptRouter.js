/* eslint-disable no-param-reassign */
const express = require('express');
const apptsController = require('../controllers/apptsController');
const addressesController = require('../controllers/addressesController');

function routes({Appt, Address}) {
  const apptRouter = express.Router();
  const controller = apptsController(Appt);
  const addressescontroller = addressesController(Address);

  apptRouter.route('/addresses')
  .post(addressescontroller.post)
  .get(addressescontroller.get);

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
