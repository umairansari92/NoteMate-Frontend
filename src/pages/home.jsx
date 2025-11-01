import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiTrash2, FiEdit } from "react-icons/fi";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const API = "https://note-mate-backend-six.vercel.app/notes";

  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || {};
    } catch {
      return {};
    }
  })();
  const first = storedUser.fname || storedUser.firstName || storedUser.firstname || storedUser.first_name;
  const last = storedUser.lname || storedUser.lastName || storedUser.lastname || storedUser.last_name;
  const concatenated = [first, last].filter(Boolean).join(" ").trim();
  const displayName =
    concatenated ||
    storedUser.name ||
    storedUser.fullName ||
    storedUser.username ||
    (storedUser.email ? storedUser.email.split("@")[0] : "User");

  const fetchNotes = async () => {
    try {
      const res = await axios.get(`${API}/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotes(res.data.notes);
    } catch (error) {
      console.log("Fetch Error:", error);
    }
  };

  useEffect(() => {
    // Home no longer lists all notes; view them on All Notes page
    setNotes([]);
  }, []);

  const handleAddNote = async () => {
    if (!title.trim() || !content.trim()) return;

    try {
      const res = await axios.post(
        `${API}/create`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      // show newly created note on Home immediately (transient)
      setNotes([res.data.note, ...notes]);
      setTitle("");
      setContent("");
    } catch (error) {
      console.log("Add Error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotes(notes.filter(n => n._id !== id));
    } catch (error) {
      console.log("Delete Error:", error);
    }
  };

  const handleStartEdit = (note) => {
    setEditingId(note._id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
  };

  const handleUpdateNote = async () => {
    if (!editingId) return;
    try {
      const res = await axios.put(
        `${API}/${editingId}`,
        { title: editTitle, content: editContent },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      const updated = res.data.note;
      setNotes(prev => prev.map(n => (n._id === updated._id ? updated : n)));
      handleCancelEdit();
    } catch (error) {
      console.log("Update Error:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="px-6 py-4 max-w-4xl mx-auto">
      
      {/* Welcome Text */}
      <h2 className="text-2xl font-semibold mb-6">
        Welcome <span className="text-indigo-600 font-bold">{displayName}</span>
      </h2>

      {/* Input Box */}
  <div className="bg-white dark:bg-slate-900/70 border border-slate-700 p-5 rounded-xl shadow-lg space-y-3 mb-6 transition-colors ring-1 ring-indigo-500/5">
        <input
          type="text"
          placeholder="Note title"
          className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-900/60 text-gray-900 dark:text-slate-100 outline-none border border-gray-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-500 transition-colors"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Write note..."
          rows={3}
          className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-900/60 text-gray-900 dark:text-slate-100 outline-none border border-gray-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-500 transition-colors"
          value={content}
          onChange={e => setContent(e.target.value)}
        />

        <button
          onClick={handleAddNote}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full shadow-md transition-colors"
        >
          Add Note
        </button>
      </div>

      {/* Notes List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {notes.map(note => (
          <div
            key={note._id}
            className="bg-white dark:bg-slate-900/70 border border-slate-700 p-5 rounded-2xl shadow-lg ring-1 ring-indigo-500/5 hover:ring-indigo-500/15 transition-all hover:shadow-xl hover:-translate-y-0.5"
          >
            {editingId === note._id ? (
              <div className="space-y-2">
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded bg-gray-100 dark:bg-gray-700 outline-none"
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                />
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 rounded bg-gray-100 dark:bg-gray-700 outline-none"
                  value={editContent}
                  onChange={e => setEditContent(e.target.value)}
                />
              </div>
            ) : (
              <>
                <h3 className="font-bold text-lg text-gray-900 dark:text-slate-100 wrap-break-word">{note.title}</h3>
                <p className="text-gray-700 dark:text-slate-300 mt-1 wrap-break-word">
                  {note.content}
                </p>
              </>
            )}

            <span className="text-sm text-gray-400 block mt-2">
              {new Date(note.updatedAt).toLocaleDateString()}
            </span>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-3">
              {editingId === note._id ? (
                <>
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full"
                    onClick={handleUpdateNote}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-300 dark:bg-gray-700 px-3 py-1 rounded-full"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button className="p-2 rounded-full text-blue-500 bg-blue-500/10 hover:bg-blue-500/20 transition" onClick={() => handleStartEdit(note)}>
                    <FiEdit />
                  </button>
                  <button
                    className="p-2 rounded-full text-red-500 bg-red-500/10 hover:bg-red-500/20 transition"
                    onClick={() => handleDelete(note._id)}
                  >
                    <FiTrash2 />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
