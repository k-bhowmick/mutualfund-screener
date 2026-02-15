const express = require("express");
const router = express.Router();
const Fund = require("../models/Fund");
const { computeScores } = require("../utils/scoring");

router.post("/", async (req, res) => {
  try {
    const { weights } = req.body;
    const funds = await Fund.find();
    const result = computeScores(funds, weights);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
