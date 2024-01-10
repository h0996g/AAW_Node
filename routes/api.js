
const express = require('express');

const userController = require('../controllers/users');
const router = express.Router();



router.post("/register", userController.register);

router.post("/login", userController.login);

router.get('/testJava', userController.testJava);


//Get UserDetail
// router.get('/user', userController.getAllUsers);


// Get all users
// Routes
/**
 * @swagger
 * /users:
 *  get:
 *    description: Use to request all users
 *    responses:
 *      '200':
 *        description: A successful response
 */
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
