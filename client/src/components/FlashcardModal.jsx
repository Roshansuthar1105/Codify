import { useState } from "react";
import { addFlashcard } from "../utils/api";
import Modal from "./Modal";

export default function FlashcardModal({ open, onClose, onFlashcardAdded }) {
  const [form, setForm] = useState({ term: "", definition: "", topic: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newCard = {
        term: form.term.trim(),
        definition: form.definition.trim(),
        topic: form.topic.charAt(0).toUpperCase() + form.topic.slice(1),
      };

      await addFlashcard(newCard); // POST to backend
      onFlashcardAdded(); // refresh parent list
      setForm({ term: "", definition: "", topic: "" });
      onClose(); // close modal
    } catch (err) {
      console.error("Error adding flashcard:", err);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Add Flashcard">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Term"
          value={form.term}
          onChange={(e) => setForm({ ...form, term: e.target.value })}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Definition"
          value={form.definition}
          onChange={(e) => setForm({ ...form, definition: e.target.value })}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Topic"
          value={form.topic}
          onChange={(e) => setForm({ ...form, topic: e.target.value })}
          required
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
          Add
        </button>
      </form>
    </Modal>
  );
}
