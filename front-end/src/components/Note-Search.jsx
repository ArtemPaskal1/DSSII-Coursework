import { useState } from "react";
import { X } from "lucide-react";

function SearchNotes({ onFilter, open, setOpen }) {
    const [query, setQuery] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const handleFilter = () => {
        onFilter({ query, fromDate, toDate });
        setOpen(false);
    };

    const handleReset = () => {
        setQuery("");
        setFromDate("");
        setToDate("");
    };

    return (
        <div className="flex justify-center mt-4">
          {open && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setOpen(false)
              }
            }}>
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Filter notes!</h2>
                <button onClick={() => setOpen(false)} className="text-gray-500">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="form-group">
                <label>Search</label>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full p-2 border rounded mt-2"
                    placeholder="Search notes title..."
                />
            </div>

            <div className="grid">
                <div className="form-group">
                    <label>From Date</label>
                    <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="w-full p-2 border rounded mt-2"
                    />
                </div>
                <div className="form-group">
                    <label>To Date</label>
                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="w-full p-2 border rounded mt-2"
                    />
                </div>
            </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setOpen(false)}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReset}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Reset
                </button>
                <button
                  onClick={handleFilter}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          )}
        </div>
    );
}

export default SearchNotes;