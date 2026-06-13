const Trip = require('../models/travlr');

// GET: /api/trips - lists all trips
const tripsList = async (req, res) => {
  Trip.find({})
    .then(trips => {
      if (!trips) {
        return res.status(404).json({ message: 'No trips found' });
      }
      return res.status(200).json(trips);
    })
    .catch(err => res.status(500).json({ message: err.message }));
};

// GET: /api/trips/:tripCode - lists a single trip
const tripsFindByCode = async (req, res) => {
  const q = await Trip
    .findOne({ code: req.params.tripCode });
  if (!q) {
    return res
      .status(404)
      .json(q);
  } else {
    return res
      .status(200)
      .json(q);
  }
};

// POST: /api/trips - adds a new trip
const tripsAddTrip = async (req, res) => {
  console.log(req.body);
  const q = await Trip.create({
    code: req.body.code,
    name: req.body.name,
    length: req.body.length,
    start: req.body.start,
    resort: req.body.resort,
    perPerson: req.body.perPerson,
    image: req.body.image,
    description: req.body.description
  });
  if (!q) {
    return res
      .status(400)
      .json(q);
  } else {
    return res
      .status(201)
      .json(q);
  }
};

// PUT: /api/trips/:tripCode - updates a single trip
const tripsUpdateTrip = async (req, res) => {
  console.log(req.params);
  console.log(req.body);
  const q = await Trip
    .findOneAndUpdate(
      { code: req.params.tripCode },
      {
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
      },
      { new: true }
    )
    .exec();
  if (!q) {
    return res
      .status(400)
      .json(q);
  } else {
    return res
      .status(201)
      .json(q);
  }
};

module.exports = { tripsList, tripsFindByCode, tripsAddTrip, tripsUpdateTrip };