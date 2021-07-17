function apptsController(Appt, Address) {
  function post(req, res) {
    const appt = new Appt(req.body);
    appt.save();
    res.status(201);
    return res.json(appt);
  }
  async function buildAppts(query) {
    const doc=await Appt.find(query).sort('date').exec();
    const promises=[];
    await doc.forEach(({ _doc }) => {
      (async () => {
        await promises.push(
          new Promise((resolve) => {
            (async () => {
              const appt=_doc;
              const { empid } = appt;
              let doctorName;
              try {
                const doctor=await Address.findOne({ userid: empid });
                const { name } = doctor;
                doctorName=name;

              }
              catch {
                doctorName=empid;
              }
              const newAppt = {doctorName, ...appt };
              resolve(newAppt);
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
    if (req.query.date) {
      query.date = req.query.date;
    }
    const result = await buildAppts(query);
    return res.json(result);
  }
  return { post, get };
}

module.exports = apptsController;
