/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const app = express();
const {
  PORT = 3000,
} = process.env;

app.use(express.json());
app.use(helmet());

mongoose.connect('mongodb://localhost:27017/arounddb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// const path = require('path');

// READ ME in the practicum project asks to create a PUBLIC folder for static built from React
// I'm leaving the PUBLIC folder in my project as it might be useful for next sprint :-)
// app.use(express.static(path.resolve(__dirname, 'public')));

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

app.use((req, res, next) => {
  req.user = {
    _id: '60c465843b70e8326ce24c57', // my test_user id in Postman
  };
  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.get('*', (req, res) => {
  res.status(404).send({
    message: 'Requested resource not found',
  });
});

app.listen(PORT, () => console.log(`Application listening on port ${PORT}!`));
