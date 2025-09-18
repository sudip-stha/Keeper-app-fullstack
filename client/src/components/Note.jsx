import React from "react";
import axios from "axios";

function Note({ id, title, content, onDelete }) {
  const token = localStorage.getItem("token");
  const apiBase = import.meta.env.VITE_API_URL;

  const handleDelete = async () => {
    try {
      await axios.delete(`${apiBase}/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onDelete(id); // update frontend state
    } catch (err) {
      console.error(err);
      alert("Failed to delete note");
    }
  };

  return (
    <div className="float-left rounded-2xl p-6 bg-amber-50 w-96 m-6">
      <h1 className="text-3xl mb-2">{title}</h1>
      <p className="text-2xl mb-2 whitespace-pre-wrap break-words">{content}</p>

      <button
        onClick={handleDelete}
        className="float-right border-none w-22 h-12 cursor-pointer text-white bg-amber-400 rounded-3xl"
      >
        DELETE
      </button>
    </div>
  );
}

export default Note;
