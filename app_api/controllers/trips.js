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

module.exports = { tripsList, tripsFindByCode };