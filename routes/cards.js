const express = require("express");
const path = require("path");
const router = express.Router();
const fs = require("fs/promises");

const filePath = path.join(__dirname, "../data/cards.json");

// gets
router.get("/", (req, res) => {
  fs.readFile(filePath)
    .then((fileData) => {
      res.send(JSON.parse(fileData));
    })
    .catch((error) => {
      res.status(500).send(`Requested resource not found. ${error}`);
    });
});

module.exports = router;
