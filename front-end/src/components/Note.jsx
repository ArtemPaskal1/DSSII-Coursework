import { motion } from "framer-motion";
import { Pencil, CircleX, FileCheck, PencilOff } from "lucide-react";
import { useState } from "react";
import noteService from "../services/noteService.js";

const Note = ({ entry, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [note, setNote] = useState(entry);

  const formatCreatedAt = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  const handleUpdate = async () => {
    try {
      await noteService.updateNote(note.id, note);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleReset = () => {
    setNote(entry);
    setIsEditing(false);
  };

  return (
    <motion.div
      className="bg-gradient-to-br from-white to-blue-50 border border-gray-200 p-4 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      {!isEditing ? (
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-gray-800 text-lg">{note.title}</h3>
            <div className="flex gap-2">
              <button onClick={onDelete} className="text-red-500 hover:text-red-700 transition-colors">
                <CircleX />
              </button>
              <button onClick={() => setIsEditing(true)} className="text-green-500 hover:text-green-700 transition-colors">
                <Pencil />
              </button>
            </div>
          </div>
          <div className="text-gray-600 text-sm mb-3 max-h-32 overflow-y-auto">{note.description || "No description"}</div>
          <p className="text-xs text-gray-400">Created at: {formatCreatedAt(note.createdAt)}</p>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-start mb-2 gap-2">
            <input
              type="text"
              value={note.title}
              onChange={(e) => setNote({ ...note, title: e.target.value })}
              className="flex-1 p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="flex gap-2">
              <button onClick={handleUpdate} className="text-green-500 hover:text-green-700 transition-colors">
                <FileCheck />
              </button>
              <button onClick={handleReset} className="text-red-500 hover:text-red-700 transition-colors">
                <PencilOff />
              </button>
            </div>
          </div>
          <textarea
            value={note.description}
            onChange={(e) => setNote({ ...note, description: e.target.value })}
            className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 h-32 resize-none"
          />
          <p className="text-xs text-gray-400 mt-2">Created at: {formatCreatedAt(note.createdAt)}</p>
        </div>
      )}
    </motion.div>
  );
};

export default Note;
