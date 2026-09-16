const express = require("express");

const Business = require("../models/Business");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// GET BUSINESS
router.get("/", authMiddleware, async (req, res) => {
  try {
    const business = await Business.findOne({
      user: req.user.id
    });

    res.json(business);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to get business"
    });
  }
});


// CREATE / UPDATE BUSINESS
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      name,
      industry,
      state,
      investment
    } = req.body;

    if (!name || !industry || !state) {
      return res.status(400).json({
        message: "Name, industry and state are required"
      });
    }

    const business = await Business.findOneAndUpdate(
      {
        user: req.user.id
      },
      {
        user: req.user.id,
        name,
        industry,
        state,
        investment: Number(investment) || 0,
        status: "Active"
      },
      {
        new: true,
        upsert: true
      }
    );

    res.json({
      message: "Business saved successfully",
      business
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to save business"
    });
  }
});


// UPDATE BUSINESS
router.put("/", authMiddleware, async (req, res) => {
  try {
    const business = await Business.findOneAndUpdate(
      {
        user: req.user.id
      },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!business) {
      return res.status(404).json({
        message: "Business profile not found"
      });
    }

    res.json({
      message: "Business updated successfully",
      business
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to update business"
    });
  }
});

module.exports = router;