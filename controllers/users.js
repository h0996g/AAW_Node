const User = require('../models/user');
const UserServices = require('../services/user.service');


//! ---------  user
exports.register = async (req, res, next) => {
  try {
    console.log("---req body---", req.body);
    const { email, password, name, phone, image } = req.body;
    const duplicate = await UserServices.getUserByEmail(email);
    if (duplicate) {
      throw new Error(`UserName ${email}, Already Registered`)
    }

    const response = await UserServices.registerUser(email, password, name, phone, image);

    let tokenData;
    tokenData = { _id: response._id, email: email };


    const token = await UserServices.generateAccessToken(tokenData, "secret", "1h")
    res.json({ status: true, message: 'User registered successfully', token: token, id: response._id });


  } catch (err) {
    console.log("---> err -->", err);
    next(err);
  }
}

exports.login = async (req, res, next) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error('Parameter are not correct');
    }
    let user = await UserServices.checkUser(email);
    if (!user) {
      throw new Error('User does not exist');
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (isPasswordCorrect === false) {
      throw new Error(`Username or Password does not match`);
    }

    // Creating Token

    let tokenData;
    tokenData = { _id: user._id, email: user.email };


    const token = await UserServices.generateAccessToken(tokenData, "secret", "1h")

    res.status(200).json({ status: true, success: "sendData", token: token });
  } catch (error) {
    console.log(error, 'err---->');
    next(error);
  }
}

// !----------------------------------
















exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = new User({ name, email });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, email, image } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { name, email, image }, { new: true });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(deletedUser);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
