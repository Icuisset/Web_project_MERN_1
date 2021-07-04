/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable no-console */
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const { celebrate, Joi, errors } = require("celebrate");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();
const { PORT = 3000 } = process.env;

const corsOptions = {
  origin: "*",
  // credentials: true,
  optionSuccessStatus: 200,
};

app.use(express.json(), cors(corsOptions));
app.use(helmet());
app.use(cookieParser());

const auth = require("./middleware/auth");

mongoose.connect("mongodb://localhost:27017/arounddb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

const { logIn, createUser } = require("./controllers/users");

/* KEEPING HARD CODE HANDY FOR TEST PURPOSE
app.use((req, res, next) => {
  req.user = {
    _id: '60c465843b70e8326ce24c57', // my test_user id in Postman
  };
  next();
});
*/

app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  logIn
);

app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser
);

app.use("/users", auth, usersRouter);
app.use("/cards", auth, cardsRouter);

app.get("*", (req, res) => {
  res.status(404).send({
    message: "Requested resource not found",
  });
});

app.use((err, req, res, next) => {
  // if an error has no status, display 500
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message,
  });
});

app.listen(PORT, () => console.log(`Application listening on port ${PORT}!`));
