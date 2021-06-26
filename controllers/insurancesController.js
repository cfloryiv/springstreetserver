function insurancesController(Insurance) {
    function post(req, res) {
      const appt = new Insurance(req.body);
      appt.save();
      res.status(201);
      return res.json(appt);
    }
    function put(req, res) {
        Insurance.findOne({name: req.query.name}, (err, ins) => {
            if (err) {
               console.log("error updating insurance");
            } else {
                if (ins===null) {
                    ins=new Insurance(req.body);
                } else {
                    ins.policies=req.body.policies;
                }
                ins.save();
            }
        });
          res.status(201);
          return;
    }
    function get(req, res) {
      const query = {};
      if (req.query.name) {
        query.name = req.query.name;
      }
      Insurance.find(query, (err, insurances) => {
        if (err) {
          return res.send(err);
        }
        const returnInsurances = insurances.map((appt) => {
          const newInsurance = appt.toJSON();
          newInsurance.links = {};
          newInsurance.links.self = `http://${req.headers.host}/api/insurances/${appt._id}`;
          return newInsurance;
        });
        return res.json(returnInsurances);
      });
    }
    return { post, get, put };
  }
  
  module.exports = insurancesController;