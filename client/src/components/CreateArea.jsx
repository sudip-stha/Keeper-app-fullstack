import axios from "axios";
import React, { useState } from "react";

function CreateArea({ onAdd }) {
  const [note, setNote] = useState({ title: "", content: "" });
  const token = localStorage.getItem("token");
  const apiBase = import.meta.env.VITE_API_URL;

  const handleNote = (e) => {
    const { name, value } = e.target;
    setNote((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiBase}/notes`,
        { title: note.title, description: note.content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onAdd({ title: note.title, content: note.content }); // update frontend
      setNote({ title: "", content: "" });
      alert("Note added successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to add note");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-96 ml-auto mr-auto bg-sky-100 p-6 rounded-3xl"
    >
      <input
        name="title"
        placeholder="Title"
        value={note.title}
        onChange={handleNote}
        className="w-full border-none p-3 text-2xl outline-none resize-none text-blue-950"
      />
      <textarea
        name="content"
        placeholder="Take a note..."
        rows="3"
        value={note.content}
        onChange={handleNote}
        className="w-full border-none p-3 outline-none resize-none text-blue-700"
      />
      <button
        type="submit"
        className="absolute right-5 bottom-5 bg-amber-400 font-bold border-none text-white rounded-4xl w-20 h-12 cursor-pointer"
      >
        Add
      </button>
    </form>
  );
}

export default CreateArea;
