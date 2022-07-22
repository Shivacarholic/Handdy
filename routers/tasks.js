const express = require("express");
const router = new express.Router();
const Task = require("../models/task");
const auth = require("../middleware/auth");

// Create a task
router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await task.save();
    res.status(200).send("Task saved: " + task);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/tasks/:id",auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(401).send({ error: "Task id not found" });
    }
    res.send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      res.status404.send({ error: "Task id not found" });
    }
    res.send(task);
  } catch (err) {
    res.status(500).send({ err: "Catch Error", err });
  }
});
module.exports = router;
