import { useState } from "react";
import { CheckCircle, Circle, Plus, Trash2 } from "lucide-react";
import { usePopup } from "../context/PopupContext";
import { useAuth } from "../store/auth";
import { motion, AnimatePresence } from "framer-motion";

export default function TodoList() {
  const { showTodo, closeAll, todos, addTodo, toggleTodoItem, deleteTodo } = usePopup();
  const { isLoggedIn } = useAuth();
  const [newTodo, setNewTodo] = useState("");

  const handleAdd = () => {
    if (!isLoggedIn) return;
    if (newTodo.trim()) {
      addTodo(newTodo);
      setNewTodo("");
    }
  };

  if (!showTodo) return null;

  return (
    <div className="p-4 rounded-2xl shadow-card bg-white dark:bg-dark-bg-primary transition-colors w-full">
      {/* Header */}
      <h2 className="text-xl font-bold mb-4 flex justify-between items-center text-black dark:text-dark-text-primary">
        Todo List
        <span className="text-sm text-gray-600 dark:text-dark-text-secondary flex items-center gap-2">
          <CheckCircle className="text-success" /> {todos.filter(t => t.completed).length} / {todos.length}
        </span>
      </h2>

      {!isLoggedIn && (
        <p className="text-sm text-red-500 mb-2">Please log in to manage your todos.</p>
      )}

      {/* Todos */}
      <ul className="space-y-2 max-h-64 overflow-y-auto">
        <AnimatePresence>
          {Array.isArray(todos) &&
            todos.map(todo => (
              <motion.li
                key={todo._id || todo.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25 }}
                layout
                className="flex items-center gap-2 p-2 border rounded border-gray-300 dark:border-dark-border"
              >
                <button
                  disabled={!isLoggedIn}
                  onClick={() => toggleTodoItem(todo._id || todo.id)}
                >
                  {todo.completed ? (
                    <CheckCircle className="text-success" />
                  ) : (
                    <Circle className="text-gray-500 dark:text-dark-text-secondary" />
                  )}
                </button>
                <span
                  className={`${
                    todo.completed
                      ? "line-through text-gray-500 dark:text-dark-text-secondary"
                      : "text-black dark:text-dark-text-primary"
                  } flex-1`}
                >
                  {todo.text}
                </span>
                <button
                  disabled={!isLoggedIn}
                  onClick={() => deleteTodo(todo._id || todo.id)}
                  className="p-1 text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </motion.li>
            ))}
        </AnimatePresence>
      </ul>

      {/* Input + Add Button */}
      <div className="flex gap-2 mt-4">
        <input
          type="text"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") handleAdd();
          }}
          placeholder={isLoggedIn ? "New task..." : "Login to add tasks"}
          disabled={!isLoggedIn}
          className="flex-1 p-2 border rounded border-gray-300 dark:border-dark-border bg-gray-50 dark:bg-dark-bg-secondary text-black dark:text-dark-text-primary"
        />

        <button
          onClick={handleAdd}
          disabled={!isLoggedIn}
          className={`p-2 rounded flex items-center ${
            isLoggedIn
              ? "bg-primary text-white hover:bg-primary-dark"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Close button */}
      <div className="flex justify-end mt-2">
        <button
          onClick={closeAll}
          className="text-sm text-gray-500 dark:text-dark-text-secondary hover:underline"
        >
          Close
        </button>
      </div>
    </div>
  );
}
