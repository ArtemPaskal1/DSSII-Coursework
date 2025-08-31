import { X } from "lucide-react";
import { useState } from "react";

function NoteCreation({ open, setOpen, onSubmit }) {
    const [note, setNote] = useState({ title: "", description: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNote((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(note);
        setNote({ title: "", description: "" });
        setOpen(false);
    };
    return (
        <div className="flex justify-center mt-4">
          {open && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setOpen(false)
                  note.title = "";
                  note.description = "";
                }
              }}>
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Create New Note</h2>
                  <button onClick={() => setOpen(false)} className="text-gray-500">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Title..."
                  name="title"
                  className="w-full p-2 border rounded mt-2"
                  value={note.title}
                  onChange={handleChange}
                />
                <textarea
                  placeholder="Write your note here..."
                  className="w-full p-2 border rounded mt-2 h-32"
                  value={note.description}
                  name="description"
                  onChange={handleChange}
                />
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => setOpen(false)}
                    className="bg-gray-300 px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
};

export default NoteCreation;