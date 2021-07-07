/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable no-console */
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const { celebrate, Joi, errors } = require("celebrate");
const cookieParser = require("cookie-parser");
// eslint-disable-next-line no-unused-vars
const bodyParser = require("body-parser");

const app = express();
const { PORT = 3000 } = process.env;

/* Creates an error when sending requests to api
const corsOptions = {
  origin: "*",
  // credentials: true,
  optionSuccessStatus: 200,
};

app.use(express.json(), cors(corsOptions));
*/

app.use(helmet());
app.use(cookieParser());

const { requestLog, errorLog } = require("./middleware/logger");
const auth = require("./middleware/auth");

mongoose.connect("mongodb://localhost:27017/arounddb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

const { signin, createUser } = require("./controllers/users");

app.use(requestLog);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  signin
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

// Error log
app.use(errorLog);

// Error handler from Celebrate
app.use(errors());

app.use((err, req, res, next) => {
  // if an error has no status, display 500
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message,
  });
});

app.listen(PORT, () => console.log(`Application listening on port ${PORT}!`));
