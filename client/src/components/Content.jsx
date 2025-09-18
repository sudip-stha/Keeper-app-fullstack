import React, { useEffect, useState } from "react";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

const Content = () => {
  const [notes, setNotes] = useState([]);
  const token = localStorage.getItem("token");
  const apiBase = import.meta.env.VITE_API_URL;


  // Fetch notes from backend
  useEffect(() => {
    async function getNotes() {
      try {
        const response = await axios.get(`${apiBase}/getNotes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotes(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    getNotes();
  }, [token]);

  function deleteNote(id) {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  }

  function addNote(newNote) {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  }

  return (
    <div className="bg-sky-300 h-screen p-2">
      <CreateArea onAdd={addNote} />
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id} // use backend ID
          title={note.title}
          content={note.description} // backend uses description
          onDelete={deleteNote}
        />
      ))}
    </div>
  );
};

export default Content;
