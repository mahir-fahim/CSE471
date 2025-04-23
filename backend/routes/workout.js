const express = require('express');
const router = express.Router();

router.get('/example', (req, res) => {
  res.send("Workout endpoint working!");
});

module.exports = router;
