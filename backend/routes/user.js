const express = require("express");
const router = express.Router();
router.put("/profile/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          weight: req.body.weight,
          height: req.body.height,
          fitnessLevel: req.body.fitnessLevel,
          foodHabit: req.body.foodHabit,
        },
      },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
