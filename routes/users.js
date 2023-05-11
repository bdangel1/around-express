const express = require('express');
const path = require('path');

const router = express.Router();
const fs = require('fs/promises');

const filePath = path.join(__dirname, '../data/users.json');

// gets

router.get('/', (req, res) => {
  fs.readFile(filePath)
    .then((fileData) => {
      res.send(JSON.parse(fileData));
    })
    .catch(() => {
      res.status(500).send({ message: '...' });
    });
});

router.get('/:_id', (req, res) => {
  const { _id } = req.params;

  fs.readFile(filePath).then((fileData) => {
    const users = JSON.parse(fileData);
    const user = users.find((u) => u._id === _id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: '...' });
    }
  });
});

module.exports = router;
