const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const Document = require("../models/Document");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// CREATE UPLOAD DIRECTORY
const uploadDirectory = path.join(
  __dirname,
  "../uploads"
);

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, {
    recursive: true
  });
}


// MULTER
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory);
  },

  filename: function (req, file, cb) {
    const extension =
      path.extname(file.originalname);

    const filename =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      extension;

    cb(null, filename);
  }
});

const upload = multer({
  storage,

  limits: {
    fileSize: 10 * 1024 * 1024
  }
});


// GET DOCUMENTS
router.get("/", authMiddleware, async (req, res) => {
  try {
    const documents = await Document.find({
      user: req.user.id
    }).sort({
      createdAt: -1
    });

    res.json(documents);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to fetch documents"
    });
  }
});


// UPLOAD DOCUMENT
router.post(
  "/upload",
  authMiddleware,
  upload.single("document"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "Please select a document"
        });
      }

      const document = await Document.create({
        user: req.user.id,

        application:
          req.body.applicationId || null,

        originalName:
          req.file.originalname,

        filename:
          req.file.filename,

        path:
          req.file.path,

        mimetype:
          req.file.mimetype,

        size:
          req.file.size
      });

      res.status(201).json({
        message: "Document uploaded successfully",
        document
      });

    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Document upload failed"
      });
    }
  }
);


// DELETE DOCUMENT
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const document = await Document.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!document) {
      return res.status(404).json({
        message: "Document not found"
      });
    }

    if (fs.existsSync(document.path)) {
      fs.unlinkSync(document.path);
    }

    await document.deleteOne();

    res.json({
      message: "Document deleted successfully"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to delete document"
    });
  }
});

module.exports = router;