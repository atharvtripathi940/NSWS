const express = require("express");

const Notification = require("../models/Notification");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// GET MY NOTIFICATIONS
router.get("/", authMiddleware, async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.user.id
    }).sort({
      createdAt: -1
    });

    res.json(notifications);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to fetch notifications"
    });
  }
});


// CREATE NOTIFICATION
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      title,
      message,
      type
    } = req.body;

    if (!title || !message) {
      return res.status(400).json({
        message: "Title and message are required"
      });
    }

    const notification = await Notification.create({
      user: req.user.id,
      title,
      message,
      type: type || "General"
    });

    res.status(201).json(notification);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to create notification"
    });
  }
});


// MARK AS READ
router.put("/:id/read", authMiddleware, async (req, res) => {
  try {
    const notification =
      await Notification.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user.id
        },
        {
          read: true
        },
        {
          new: true
        }
      );

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found"
      });
    }

    res.json(notification);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to update notification"
    });
  }
});


// MARK ALL AS READ
router.put("/read-all", authMiddleware, async (req, res) => {
  try {
    await Notification.updateMany(
      {
        user: req.user.id,
        read: false
      },
      {
        read: true
      }
    );

    res.json({
      message: "All notifications marked as read"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to update notifications"
    });
  }
});


// DELETE NOTIFICATION
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const notification =
      await Notification.findOneAndDelete({
        _id: req.params.id,
        user: req.user.id
      });

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found"
      });
    }

    res.json({
      message: "Notification deleted successfully"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to delete notification"
    });
  }
});

module.exports = router;