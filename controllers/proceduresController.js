function proceduresController(Procedure) {
    function post(req, res) {
      const appt = new Procedure(req.body);
      appt.save();
      res.status(201);
      return res.json(appt);
    }
    function get(req, res) {
      const query = {};
      if (req.query.code) {
        query.code = req.query.code;
      }
      Procedure.find(query, (err, procedures) => {
        if (err) {
          return res.send(err);
        }
        const returnProcedures = procedures.map((appt) => {
          const newProcedure = appt.toJSON();
          newProcedure.links = {};
          newProcedure.links.self = `http://${req.headers.host}/api/procedures/${appt._id}`;
          return newProcedure;
        });
        return res.json(returnProcedures);
      });
    }
    return { post, get };
  }
  
  module.exports = proceduresController;