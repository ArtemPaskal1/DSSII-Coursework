import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Search, Album } from "lucide-react"; 
import { useAuth } from '../context/AuthContext.jsx';
import NoteCreation from '../components/Note-Creation.jsx';
import SearchFilter from '../components/Note-Search.jsx';
import Note from '../components/Note.jsx';
import noteService from '../services/noteService.js';
import PaginationFooter from "../components/Footer-Pagination.jsx";

function HomePage() {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState(false);
    const [notes, setNotes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const pageSize = 9;
    const { user } = useAuth();

    const createNote = async (note) => {
        try {
            const response = await noteService.createNote(note);
            setNotes((prev) => [response, ...prev]);
            getAllNotes(currentPage);
        } catch (error) {
            console.error("Error creating note:", error);
        }
    };

    const deleteNote = async (noteId) => {
        try {
            await noteService.deleteNote(noteId);
            setNotes((prev) => prev.filter((note) => note.id !== noteId));
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };

    const getAllNotes = async (page = currentPage) => {
        try {
            setIsLoading(true);
            const response = await noteService.getAllNotes(page, pageSize);
            setTotalPages(response.pageCount);
            setCurrentPage(response.page);
            setNotes(response.notes || []);
        } catch (e) {
            console.error("Error fetching notes:", e);
            setCurrentPage(1);
            setTotalPages(0);
            setNotes([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePageChange = (newPage) => {
        const validatedPage = Math.max(1, Math.min(newPage, totalPages));
        if (validatedPage !== currentPage) setCurrentPage(validatedPage);
    };

    const handleFilter = async (filters) => {
        try {
            setIsLoading(true);
            const { query, fromDate, toDate } = filters;
            const data = await noteService.searchNotes(query, fromDate, toDate,1, pageSize);
            setNotes(data.notes || []);
            setTotalPages(data.pageCount);
            setCurrentPage(data.page);
        } catch (error) {
            console.error("Error filtering notes:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (user) getAllNotes(currentPage);
    }, [user, currentPage]);

    return (
        <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-blue-50 to-white">
            
            <div className="flex justify-center p-4">
                <div className="inline-flex bg-white py-3 px-5 shadow-lg rounded-2xl gap-3">
                    <button
                        className="p-3 bg-green-500 hover:bg-green-600 text-white rounded-full transition-transform hover:scale-110"
                        onClick={() => setOpen(true)}
                    >
                        <Plus size={20} />
                    </button>
                    <button
                        className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-transform hover:scale-110"
                        onClick={() => setSearch(true)}
                    >
                        <Search size={20} />
                    </button>
                    <button
                        className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-transform hover:scale-110"
                        onClick={() => { setCurrentPage(1); getAllNotes(1); }}
                    >
                        <Album size={20} />
                    </button>
                </div>

                <NoteCreation open={open} setOpen={setOpen} onSubmit={createNote} />
                <SearchFilter onFilter={handleFilter} open={search} setOpen={setSearch} />
            </div>

            <div className="flex-1 overflow-y-auto p-6">
                {isLoading ? (
                    <div className="h-full flex items-center justify-center text-gray-500 text-lg">
                        Loading notes...
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        <AnimatePresence>
                            {notes.length === 0 ? (
                                <motion.div
                                    className="col-span-full flex items-center justify-center text-gray-500 text-center p-10"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    No notes available. Create your first note!
                                </motion.div>
                            ) : (
                                notes.map((note) => (
                                    <Note key={note.id} entry={note} onDelete={() => deleteNote(note.id)} />
                                ))
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            <div className="mt-auto border-t bg-white shadow-inner p-4">
                <PaginationFooter
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={handlePageChange}
                />
            </div>
        </div>
    );
}

export default HomePage;
