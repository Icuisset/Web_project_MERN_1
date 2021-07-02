/* eslint-disable no-console */
const express = require('express');

const router = express.Router();

const {
  getUsers,
  findUser,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/:id', findUser);

router.patch('/me', updateUserProfile);

router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
