/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
const User = require('../models/user');

// eslint-disable-next-line no-multiple-empty-lines

/** GET /users — returns all users */
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: 'users not found',
      });
    });
};

/** GET /users/:userId - returns a user by _id */
module.exports.findUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send({
          message: 'userId not found',
        });
      }
    })
    .catch((err) => {
      console.log(err.name);
      if (err.name === 'CastError') {
        return res.status(400).send({
          message: 'Id is not valid',
        });
      }
      return res.status(500).send({
        message: 'user not found',
      });
    });
};

/** POST /users — creates a new user  */
module.exports.createUser = (req, res) => {
  console.log(req.body);
  const {
    name,
    about,
    avatar,
  } = req.body;
  User.create({
    name,
    about,
    avatar,
  })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      console.log(err.name);
      res.status(500).send({
        message: 'user not created',
      });
    });
};

/** PATCH /users/me — update profile with my name and about */
module.exports.updateUserProfile = (req, res) => {
  console.log(req.body);
  const filter = {
    _id: req.user._id,
  };
  const {
    name,
    about,
  } = req.body;
  User.findOneAndUpdate(filter, {
    name,
    about,
  }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      console.log(err.name);
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Validation failed : the format of the request is not valid',
        });
      }
      return res.status(500).send({
        message: 'user not updated',
      });
    });
};

/** PATCH /users/me/avatar — update profile with my avatar */
module.exports.updateUserAvatar = (req, res) => {
  console.log(req.body);
  const filter = {
    _id: req.user._id,
  };
  const {
    avatar,
  } = req.body;
  User.findOneAndUpdate(filter, {
    avatar,
  }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      console.log(err.name);
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Validation failed : the format of the url is not valid',
        });
      }
      return res.status(500).send({
        message: 'user not updated',
      });
    });
};
