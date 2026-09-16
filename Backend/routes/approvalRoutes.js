const express = require("express");

const Approval = require("../models/Approval");

const router = express.Router();


// Add approval
router.post("/", async (req, res) => {

    try {

        const approval = await Approval.create(req.body);

        res.status(201).json({
            message: "Approval created",
            approval
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// Get all approvals
router.get("/", async (req, res) => {

    try {

        const approvals = await Approval.find();

        res.json(approvals);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// Search/filter approvals
router.get("/search/filter", async (req, res) => {

    try {

        const { state, industry } = req.query;

        const filter = {};

        if (state) {
            filter.state = state;
        }

        if (industry) {
            filter.industry = industry;
        }

        const approvals = await Approval.find(filter);

        res.json(approvals);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;