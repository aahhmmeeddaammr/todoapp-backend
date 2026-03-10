const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Todo = require("../models/todo");

// GET all todos for the authenticated user
router.get("/", auth, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.user.id }).sort({ createdAt: -1 });
    res.json({ data: todos, message: "Success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET one todo
router.get("/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user.user.id });
    if (!todo) return res.status(404).json({ error: "Todo not found" });
    res.json({ data: todo, message: "Success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new todo
router.post("/", auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTodo = new Todo({
      title,
      description,
      user: req.user.user.id, // Assign to current user
    });
    const savedTodo = await newTodo.save();
    res.status(201).json({ data: savedTodo, message: "Success" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT / UPDATE a todo
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    // Find and update only if it belongs to the user
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user.user.id },
      { title, description, completed },
      { new: true, runValidators: true },
    );

    if (!todo) return res.status(404).json({ error: "Todo not found" });

    res.json({ data: todo, message: "Success" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a todo
router.delete("/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user.user.id });
    if (!todo) return res.status(404).json({ error: "Todo not found" });
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
