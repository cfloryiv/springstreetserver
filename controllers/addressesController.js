function addressesController(Address) {
    function post(req, res) {
      const address = new Address(req.body);
      address.save();
      res.status(201);
      return res.json(address);
    }
    function get(req, res) {
      const query = {};
      if (req.query.userid) {
        query.date = req.query.userid;
      }
      Address.find(query, (err, addresses) => {
        if (err) {
          return res.send(err);
        }
        const returnAddresss = addresses.map((address) => {
          const newAddress = address.toJSON();
          newAddress.links = {};
          newAddress.links.self = `http://${req.headers.host}/api/addresses/${address._id}`;
          return newAddress;
        });
        return res.json(returnAddresss);
      });
    }
    return { post, get };
  }
  
  module.exports = addressesController;