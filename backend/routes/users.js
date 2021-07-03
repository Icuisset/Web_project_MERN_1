/* eslint-disable no-console */
const express = require('express');

const router = express.Router();

const {
  getUsers,
  findUser,
  findCurrentUser,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', findCurrentUser);

router.get('/:id', findUser);

router.patch('/me', updateUserProfile);

router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
