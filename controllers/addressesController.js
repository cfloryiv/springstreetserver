function addressesController(Address) {
  function post(req, res) {
    const address = new Address(req.body);
    address.save();
    res.status(201);
    return res.json(address);
  }
  function put(req, res) {
    const address = {};
    address.name = req.body.name;
    address.street = req.body.street;
    address.city = req.body.city;
    address.state = req.body.state;
    address.zipcode = req.body.zipcode;
    address.telephone = req.body.telephone;
    address.email = req.body.email;
    console.log(address);
    console.log(req.params);
    result = Address.findByIdAndUpdate(req.params.Id, address, (err, doc) => {
      if (err) {
        console.log(err);
      }
    });
    res.status(201);
    return;
  }
  function get(req, res) {
    const query = {};
    if (req.query.userid) {
      query.userid = req.query.userid;
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
  return { post, get, put };
}

module.exports = addressesController;
