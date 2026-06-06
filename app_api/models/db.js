const mongoose = require('mongoose');

const dbURI = process.env.DB_HOST 
  ? `mongodb://${process.env.DB_HOST}/travlr` 
  : 'mongodb://127.0.0.1:27017/travlr';

const readLine = require('readline');

const connect = () => {
  setTimeout(() => mongoose.connect(dbURI, {}), 1000);
};

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', err => {
  console.log('Mongoose connection error: ', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

const gracefulShutdown = (msg) => {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
  });
};

process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart');
  process.kill(process.pid, 'SIGUSR2');
});

process.on('SIGINT', () => {
  gracefulShutdown('app termination');
  process.exit(0);
});

process.on('SIGTERM', () => {
  gracefulShutdown('app shutdown');
  process.exit(0);
});

connect();
require('./travlr');

module.exports = mongoose;