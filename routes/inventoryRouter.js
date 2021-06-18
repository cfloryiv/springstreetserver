/* eslint-disable no-param-reassign */
const express = require('express');
const inventorysController = require('../controllers/inventorysController');

function routes(Inventory) {
  const inventoryRouter = express.Router();
  const controller = inventorysController(Inventory);
  inventoryRouter.route('/inventorys')
    .post(controller.post)
    .get(controller.get);
  inventoryRouter.use('/inventorys/:inventoryId', (req, res, next) => {
    Inventory.findById(req.params.inventoryId, (err, inventory) => {
      if (err) {
        return res.send(err);
      }
      if (inventory) {
        req.inventory = inventory;
        return next();
      }
      return res.sendStatus(404);
    });
  });
  inventoryRouter.route('/inventorys/:inventoryId')
    .get((req, res) => {
      const returnInventory = req.inventory.toJSON();

      returnInventory.links = {};
      const genre = req.inventory.genre.replace(' ', '%20');
      returnInventory.links.FilterByThisGenre = `http://${req.headers.host}/api/inventorys/?genre=${genre}`;
      res.json(returnInventory);
    })
    .put((req, res) => {
      const { inventory } = req;
      inventory.title = req.body.title;
      inventory.author = req.body.author;
      inventory.genre = req.body.genre;
      inventory.read = req.body.read;
      req.inventory.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(inventory);
      });
    })
    .patch((req, res) => {
      const { inventory } = req;
      // eslint-disable-next-line no-underscore-dangle
      if (req.body._id) {
        // eslint-disable-next-line no-underscore-dangle
        delete req.body._id;
      }
      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        inventory[key] = value;
      });
      req.inventory.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(inventory);
      });
    })
    .delete((req, res) => {
      req.inventory.remove((err) => {
        if (err) {
          return res.send(err);
        }
        return res.sendStatus(204);
      });
    });
  return inventoryRouter;
}

module.exports = routes;
