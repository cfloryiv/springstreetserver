function apptsController(Appt) {
  function post(req, res) {
    const appt = new Appt(req.body);
    appt.save();
    res.status(201);
    return res.json(appt);
  }
  function get(req, res) {
    const query = {};
    if (req.query.date) {
      query.date = req.query.date;
    }
    Appt.find(query, (err, appts) => {
      if (err) {
        return res.send(err);
      }
      const returnAppts = appts.map((appt) => {
        const newAppt = appt.toJSON();
        return newAppt;
      });
      return res.json(returnAppts);
    });
  }
  return { post, get };
}

module.exports = apptsController;
