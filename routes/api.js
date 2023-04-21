
const express = require('express');
const userController = require('../controllers/users');
const router = express.Router();


router.post("/register", userController.register);

router.post("/login", userController.login);



//Get UserDetail
// router.get('/user', userController.getAllUsers);


// Get all users
router.get('/users', userController.getAllUsers);

// Get user by ID   nfsha b3d li njib current user
router.get('/users/:id', userController.getUserById);

// Create new user
router.post('/users', userController.createUser);

// Update user
router.put('/users/:id', userController.updateUser);

// Delete user
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
