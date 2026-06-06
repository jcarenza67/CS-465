const fetch = require('node-fetch');
const tripsEndpoint = 'http://localhost:3000/api/trips';
const options = {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
};

const index = (req, res) => {
  res.render('index', { title: 'Travlr Getaways' });
};

const travel = async (req, res) => {
  fetch(tripsEndpoint, options)
    .then(res => res.json())
    .then(json => {
      if (!json || !Array.isArray(json)) {
        return res.status(404).json({ message: 'No trips found' });
      }
      if (json.length === 0) {
        return res.status(404).json({ message: 'No trips found in database' });
      }
      res.render('travel', { title: 'Travlr Getaways', trips: json });
    })
    .catch(err => res.status(500).send(err.message));
};

const about = (req, res) => {
  res.render('about', { title: 'Travlr Getaways' });
};

const contact = (req, res) => {
  res.render('contact', { title: 'Travlr Getaways' });
};

const meals = (req, res) => {
  res.render('meals', { title: 'Travlr Getaways' });
};

const news = (req, res) => {
  res.render('news', { title: 'Travlr Getaways' });
};

const rooms = (req, res) => {
  res.render('rooms', { title: 'Travlr Getaways' });
};

module.exports = { index, travel, about, contact, meals, news, rooms };