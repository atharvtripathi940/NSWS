const express = require("express");

const Application = require("../models/Application");
const Approval = require("../models/Approval");
const Notification = require("../models/Notification");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// GET MY APPLICATIONS
router.get("/", authMiddleware, async (req, res) => {
  try {
    const applications = await Application.find({
      user: req.user.id
    })
      .populate("approval")
      .sort({
        createdAt: -1
      });

    res.json(applications);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to fetch applications"
    });
  }
});


// CREATE APPLICATION
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { approvalId } = req.body;

    if (!approvalId) {
      return res.status(400).json({
        message: "approvalId is required"
      });
    }

    const approval = await Approval.findById(approvalId);

    if (!approval) {
      return res.status(404).json({
        message: "Approval not found"
      });
    }

    const applicationId =
      "NSWS-" +
      Date.now() +
      "-" +
      Math.floor(100 + Math.random() * 900);

    const application = await Application.create({
      applicationId,
      user: req.user.id,
      approval: approval._id,
      status: "Pending"
    });

    await Notification.create({
      user: req.user.id,
      title: "Application Submitted",
      message:
        `${approval.name} application submitted successfully.`,
      type: "Application"
    });

    const result = await Application.findById(
      application._id
    ).populate("approval");

    res.status(201).json(result);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to create application"
    });
  }
});


// GET SINGLE APPLICATION
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const application = await Application.findOne({
      _id: req.params.id,
      user: req.user.id
    }).populate("approval");

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    res.json(application);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to fetch application"
    });
  }
});


// UPDATE APPLICATION STATUS
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { status, queryMessage } = req.body;

    const application = await Application.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id
      },
      {
        status,
        queryMessage: queryMessage || ""
      },
      {
        new: true
      }
    ).populate("approval");

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    res.json(application);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to update application"
    });
  }
});

module.exports = router;