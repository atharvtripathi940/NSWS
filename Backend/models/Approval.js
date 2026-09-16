const mongoose = require("mongoose");

const approvalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    department: {
      type: String,
      required: true
    },

    description: {
      type: String,
      default: ""
    },

    industry: {
      type: String,
      default: ""
    },

    state: {
      type: String,
      default: ""
    },

    minInvestment: {
      type: Number,
      default: 0
    },

    maxInvestment: {
      type: Number,
      default: Number.MAX_SAFE_INTEGER
    },

    documents: {
      type: [String],
      default: []
    },

    processingTime: {
      type: String,
      default: ""
    },

    active: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Approval", approvalSchema);