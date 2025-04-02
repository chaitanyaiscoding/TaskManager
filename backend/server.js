const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/tasks", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Database connection error:", err));

// Task schema and model
const taskSchema = new mongoose.Schema({
    title: String,
    completed: Boolean,
});

const Task = mongoose.model("Task", taskSchema);

// Routes
app.get("/api/tasks", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.post("/api/tasks", async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.json(task);
});

app.delete("/api/tasks/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
