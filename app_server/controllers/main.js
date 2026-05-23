var fs = require('fs');

const index = (req, res) => {
  res.render('index', { title: 'Travlr Getaways' });
};

const travel = (req, res) => {
  var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));
  res.render('travel', { title: 'Travlr Getaways', trips });
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