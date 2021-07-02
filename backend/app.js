/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const app = express();
const {
  PORT = 3000,
} = process.env;

app.use(express.json());
app.use(helmet());
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/arounddb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { logIn, createUser } = require('./controllers/users');

app.use((req, res, next) => {
  req.user = {
    _id: '60c465843b70e8326ce24c57', // my test_user id in Postman
  };
  next();
});

app.post('/signin', logIn);
app.post('/signup', createUser);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.get('*', (req, res) => {
  res.status(404).send({
    message: 'Requested resource not found',
  });
});

app.listen(PORT, () => console.log(`Application listening on port ${PORT}!`));
