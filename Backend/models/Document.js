const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      default: null
    },

    originalName: {
      type: String,
      required: true
    },

    filename: {
      type: String,
      required: true
    },

    path: {
      type: String,
      required: true
    },

    mimetype: {
      type: String,
      required: true
    },

    size: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Document",
  documentSchema
);