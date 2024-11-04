const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

router.post('/usuarios', authMiddleware, userController.createUser);
router.post('/login', userController.login);
router.put('/usuarios/:id', authMiddleware, userController.updateUser);
router.delete('/usuarios/:id', authMiddleware, userController.deleteUser);

module.exports = router;
