import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "../store/auth";

const PopupContext = createContext(undefined);

const usePopup = () => {
  const ctx = useContext(PopupContext);
  if (!ctx) {
    throw new Error("usePopup must be used inside a PopupProvider");
  }
  return ctx;
};

const PopupProvider = ({ children }) => {
  const { API, isLoggedIn } = useAuth();
  const token = localStorage.getItem("token");

   

  // Popup state
  const [showTodo, setShowTodo] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  // Todo state
  const [todos, setTodos] = useState([]);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setTodos([]);
      return;
    }
    fetch(`${API}/api/todos`, { headers })
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Failed to fetch todos:", err));
  }, [token, isLoggedIn]);

  const addTodo = async (text) => {
    if (!isLoggedIn) return;
    try {
      const res = await fetch(`${API}/api/todos`, {
        method: "POST",
        headers,
        body: JSON.stringify({ text, completed: false }),
      });
      const saved = await res.json();
      setTodos((prev) => [...prev, saved]);
    } catch (err) {
      console.error("Failed to add todo:", err);
    }
  };

  const toggleTodoItem = async (id) => {
    if (!isLoggedIn) return;
    const todo = todos.find((t) => t._id === id);
    if (!todo) return;
    try {
      const res = await fetch(`${API}/api/todos/${id}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ completed: !todo.completed }),
      });
      const updated = await res.json();
      setTodos((prev) => prev.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      console.error("Failed to toggle todo:", err);
    }
  };

  const deleteTodo = async (id) => {
    if (!isLoggedIn) return;
    try {
      await fetch(`${API}/api/todos/${id}`, { method: "DELETE", headers });
      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Failed to delete todo:", err);
    }
  };

  // Popup toggles
  const toggleTodo = () => {
    setShowTodo((prev) => !prev);
    if (!showTodo) setShowCalendar(false);
  };
  const toggleCalendar = () => {
    setShowCalendar((prev) => !prev);
    if (!showCalendar) setShowTodo(false);
  };
  const closeAll = () => {
    setShowTodo(false);
    setShowCalendar(false);
  };

  return (
    <PopupContext.Provider
      value={{
        showTodo,
        showCalendar,
        toggleTodo,
        toggleCalendar,
        closeAll,
        todos,
        setTodos,
        addTodo,
        toggleTodoItem,
        deleteTodo,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
};

export { PopupProvider, usePopup };
