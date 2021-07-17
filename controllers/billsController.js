function billsController(Bill, Address, Procedure) {
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

  async function buildBills(query) {
    const doc = await Bill.find(query).sort('date').exec();
    const promises = [];
    await doc.forEach(({ _doc }) => {
      (async () => {
        await promises.push(
          new Promise((resolve) => {
            (async () => {

              const bill=_doc;
              const { empid, code } = bill;

              const doctor = Address.findOne({ userid: empid });
              const procedure = Procedure.findOne({ code });

              const { name } = await doctor;
              const { desc } = await procedure;

              const newBill = { name, desc, ...bill };
              resolve(newBill);
            })();
          })
        );
      })();
    });
    return Promise.all(promises)
      .then((res) => {
        return res;
      });
  }
  async function get(req, res) {
    const query = {};
    if (req.query.userid) {
      query.userid = req.query.userid;
    }
    const result = await buildBills(query);
    return res.json(result);
  }
  return { post, get, put };
}
module.exports = billsController;
