function billsController(Bill) {
  function post(req, res) {
    const bill = new Bill(req.body);
    bill.save();
    res.status(201);
    return res.json(bill);
  }
  function put(req, res) {
    const bill = {};
    bill.code = req.body.code;
    result = Bill.findByIdAndUpdate(req.params.Id, bill, (err, doc) => {
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
    Bill.find(query, (err, bills) => {
      if (err) {
        return res.send(err);
      }
      const returnBills = bills.map((bill) => {
        const newBill = bill.toJSON();
        newBill.links = {};
        newBill.links.self = `http://${req.headers.host}/api/bills/${bill._id}`;
        return newBill;
      });
      return res.json(returnBills);
    }).sort('date');
  }
  return { post, get, put };
}

module.exports = billsController;
