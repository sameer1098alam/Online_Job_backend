const express = require("express");
const Job = require("../models/Job");
const router = express.Router();

router.post("/post-job", async (req, res) => {
  try {
    const { title, description, salary, employerId } = req.body;

    const job = new Job({ title, description, salary, employerId });
    await job.save();

    res.status(201).json({ message: "Job posted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
});

router.get("/search-jobs", async (req, res) => {
  try {
    const { keyword } = req.query;

    const jobs = await Job.find({ title: new RegExp(keyword, "i") });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
