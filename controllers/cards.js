const Card = require('../models/cardsModel');

// GET
const getCards = async (req, res) => {
  try {
    const cards = await Card.find({ _id: 'dbfe53c3c4d568240378b0c6' }).orFail(
      () => {
        const error = new Error('No card found with that id');
        error.statusCode = 404;
        throw error;
      },
    );
    res.json(cards);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while retrieving the cards.' });
  }
};

// POST
const createCard = async (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;
  // console.log(req.user._id);

  try {
    const card = new Card({
      name,
      link,
      owner: _id,
    });
    const savedCard = await card.save();
    return res.status(201).json(savedCard);
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'An error occurred while creating the card.' });
  }
};

// DELETE
const deleteCard = async (req, res) => {
  const { cardId } = req.params;

  try {
    const deletedCard = await Card.findByIdAndRemove(cardId);
    if (!deletedCard) {
      return res.status(404).json({ error: 'Card not found.' });
    }
    return res.json(deletedCard);
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'An error occurred while deleting the card.' });
  }
};

const likeCard = async (req, res) => {
  try {
    await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },

      { new: true },
    ).orFail(() => {
      const error = new Error('No user/card found with that id');
      error.statusCode = 404;
      throw error;
    });
    res.send('like was added');
  } catch (err) {
    if (err.statusCode === 404) {
      res.status(404).send({ message: 'invalid card id' });
    } else if (err.name === 'CastError') {
      res.status(404).send({ message: 'invalid card id' });
    } else {
      res.status(500).send({ message: 'An error has occurred on the server.' });
    }
  }
};

const dislikeCard = async (req, res) => {
  try {
    await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },

      { new: true },
    ).orFail(() => {
      const error = new Error('No user/card found with that id');
      error.statusCode = 404;
      throw error;
    });
    res.send('like was removed');
  } catch (err) {
    if (err.statusCode === 404) {
      res.status(404).send({ message: 'invalid card id' });
    } else if (err.name === 'CastError') {
      res.status(404).send({ message: 'invalid card id' });
    } else {
      res.status(500).send({ message: 'An error has occurred on the server.' });
    }
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
