const mongoose = require('mongoose');

const dbURI = process.env.DB_HOST
  ? `mongodb://${process.env.DB_HOST}/travlr`
  : 'mongodb://127.0.0.1:27017/travlr';

const connect = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log(`Mongoose connected to ${dbURI}`);
  } catch (err) {
    console.log('Mongoose connection error: ', err);
    process.exit(1);
  }
};

mongoose.connection.on('error', err => {
  console.log('Mongoose connection error: ', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

const gracefulShutdown = async (msg) => {
  await mongoose.connection.close();
  console.log(`Mongoose disconnected through ${msg}`);
};

process.once('SIGUSR2', async () => {
  await gracefulShutdown('nodemon restart');
  process.kill(process.pid, 'SIGUSR2');
});

process.on('SIGINT', async () => {
  await gracefulShutdown('app termination');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await gracefulShutdown('app shutdown');
  process.exit(0);
});

require('./travlr');
module.exports = { connect, connection: mongoose };