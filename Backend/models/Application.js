const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    applicationId: {
      type: String,
      required: true,
      unique: true
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    approval: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Approval",
      required: true
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Under Review",
        "Approved",
        "Rejected",
        "Query Raised"
      ],
      default: "Pending"
    },

    queryMessage: {
      type: String,
      default: ""
    },

    submittedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Application",
  applicationSchema
);