const express = require('express');
const { rimUserRegister } = require('../../controllers/authentication/register');
const { login } = require('../../controllers/authentication/login');
const { logout } = require('../../controllers/authentication/logout');
const { authMiddleware } = require('../../controllers/authentication/authMiddleware');

const router = express.Router();

router.post('/register', rimUserRegister);
router.post('/login', login);
router.post('/logout', logout);

router.get('/check-auth', authMiddleware, (req, res) => {
  const user = req.user;

  res.status(200).json({
    success: true,
    message: 'Authenticated User',
    user,
  });
});

module.exports = router;
