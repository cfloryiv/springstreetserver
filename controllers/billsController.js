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
  async function getBills(Bill, query) {
    // const query = { userid: "cfloryiv" };
    return await Bill.find(query).sort("date").exec();
  }
  async function getProcedure(Procedure, code) {
    return await Procedure.findOne({ code: code })
      .exec()
      .then((proc) => {
        return proc._doc;
      });
  }
  async function getAddress(Address, empid) {
    return Address.findOne({ userid: empid })
      .exec()
      .then((addr) => {
        return addr._doc;
      });
  }

  async function buildBills(query) {
    return new Promise((resolve) => {
      (async () => {
        const doc = await getBills(Bill, query);
        const newBills = [];
        await doc.forEach((temp) => {
          const bill = temp._doc;
          (async () => {
            // lookup the doctors name
            const { empid } = bill;
            const doctor = await getAddress(Address, empid);
            // lookup the procedure name
            const { code } = bill;
            const procedure = await getProcedure(Procedure, code);
            const { name } = doctor;
            const { desc } = procedure;
            const newBill = { name, desc, ...bill };
            await newBills.push(newBill);
            if (newBills.length===doc.length) {
              resolve(newBills)

            }
          
          })();
        });
      })();
    })
  }
  async function get(req, res) {
    const query = {};
    if (req.query.userid) {
      query.userid = req.query.userid;
    }
    // Bill.find(query, (err, bills) => {
    //   if (err) {
    //     return res.send(err);
    //   }
    //   const returnBills = bills.map((bill) => {
    //     const newBill = bill.toJSON();
    //     return newBill;
    //   });
    //   return res.json(returnBills);
    // }).sort('date');
    const result = await buildBills(query);
    return res.json(result);
  }
  return { post, get, put };
}
module.exports = billsController;
