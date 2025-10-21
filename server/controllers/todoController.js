import Todo from "../models/TodoSchema.js";

// Get all todos for a user
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    return res.json(todos);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Add a new todo
export const addTodo = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text)
      return res.status(400).json({ message: "Todo text is required" });

    const newTodo = await Todo.create({
      user: req.user.id,
      text,
      completed: false,
    });

    return res.status(201).json(newTodo);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Toggle todo completion status
export const toggleTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    todo.completed = !todo.completed;
    await todo.save();

    return res.json(todo);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Delete a todo
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    await Todo.findByIdAndDelete(id);
    return res.json({ message: "Todo deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
