/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
const Card = require('../models/card');

// eslint-disable-next-line no-multiple-empty-lines
/** GET /cards — returns all cards */
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: 'cards not found',
      });
    });
};

/** POST /cards — creates a new card */
module.exports.createCard = (req, res) => {
  console.log(req.body);
  const owner = req.user._id;
  const {
    name,
    link,
  } = req.body;
  Card.create({
    name,
    link,
    owner,
  })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: 'card not created',
      });
    });
};

/** DELETE /cards/:cardId — deletes a card by _id */
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (card && (req.user._id.toString() === card.owner.toString())) {
        res.status(200).send(card);
      } else {
        res.status(404).send({
          message: 'cardId not found or User does not have the rights to delete this card',
        });
      }
    })
    .catch((err) => {
      console.log(err.name);
      if (err.name === 'CastError') {
        return res.status(400).send({
          message: 'Card Id is not valid',
        });
      }
      return res.status(500).send({
        message: 'card not deleted',
      });
    });
};

/** PUT /cards/:cardId/likes — like a card */
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, {
    $addToSet: {
      likes: req.user._id,
    },
  }, // add _id to the array if it's not there yet
  {
    new: true,
  })
    .then((card) => {
      if (card) {
        res.status(200).send(card);
      } else {
        res.status(404).send({
          message: 'cardId not found',
        });
      }
    })
    .catch((err) => {
      console.log(err.name);
      if (err.name === 'CastError') {
        return res.status(400).send({
          message: 'Card Id is not valid',
        });
      }
      return res.status(500).send({
        message: 'like not added',
      });
    });
};

/** DELETE /cards/:cardId/likes — dislike a card */
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, {
    $pull: {
      likes: req.user._id,
    },
  }, // remove _id to the array if it's there
  {
    new: true,
  })
    .then((card) => {
      if (card) {
        res.status(200).send(card);
      } else {
        res.status(404).send({
          message: 'card Id not found',
        });
      }
    })
    .catch((err) => {
      console.log(err.name);
      if (err.name === 'CastError') {
        return res.status(400).send({
          message: 'Card Id is not valid',
        });
      }
      return res.status(500).send({
        message: 'like not removed',
      });
    });
};
