const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    name: {
      type: String,
      required: true
    },

    industry: {
      type: String,
      required: true
    },

    state: {
      type: String,
      required: true
    },

    investment: {
      type: Number,
      default: 0
    },

    status: {
      type: String,
      default: "Active"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Business", businessSchema);