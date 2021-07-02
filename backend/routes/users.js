/* eslint-disable no-console */
const express = require('express');

const router = express.Router();

const {
  getUsers,
  findUser,
  createUser,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/:id', findUser);

router.post('/', createUser);

router.patch('/me', updateUserProfile);

router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
