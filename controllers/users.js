const User = require('../models/usersModel');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).json({ message: 'Error' });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User ID not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user' });
  }
};

// Create a new user
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  const newUser = new User({
    name,
    about,
    avatar,
  });
  newUser
    .save()
    .then((savedUser) => {
      res.status(201).json(savedUser);
    })
    .catch(() => {
      res.status(500).json({ message: 'Error creating user' });
    });
};

const updateProfile = async (req, res) => {
  try {
    const { name, about } = req.body;
    const newUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true },
    ).orFail(() => {
      const error = new Error('No user/card found with that id');
      error.statusCode = 400;
      throw error;
    });
    res.send(newUser);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({
        message: 'invalid data passed to the methods for creating a user ',
      });
    } else if (err.statusCode === 404) {
      res.status(404).send({ message: 'there is no such user' });
    } else {
      res.status(500).send({ message: 'An error has occurred on the server.' });
    }
  }
};
const updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const newUser = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true },
    ).orFail(() => {
      const error = new Error('No user/card found with that id');
      error.statusCode = 400;
      throw error;
    });
    res.send(newUser);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({
        message:
          'invalid data passed to the methods for updating a user avatar ',
      });
    } else if (err.statusCode === 404) {
      res.status(404).send({ message: 'there is no such user' });
    } else {
      res.status(500).send({ message: 'An error has occurred on the server.' });
    }
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
};
