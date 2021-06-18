function inventorysController(Inventory) {
    function post(req, res) {
      const inventory = new Inventory(req.body);
      if (!req.body.desc) {
        res.status(400);
        return res.send('Desc is required');
      }
      inventory.save();
      res.status(201);
      return res.json(inventory);
    }
    function get(req, res) {
      const query = {};
      if (req.query.genre) {
        query.genre = req.query.genre;
      }
      Inventory.find(query, (err, inventorys) => {
        if (err) {
          return res.send(err);
        }
        const returnInventorys = inventorys.map((inventory) => {
          const newInventory = inventory.toJSON();
          newInventory.links = {};
          newInventory.links.self = `http://${req.headers.host}/api/inventorys/${inventory._id}`;
          return newInventory;
        });
        return res.json(returnInventorys);
      });
    }
    return { post, get };
  }
  
  module.exports = inventorysController;
  