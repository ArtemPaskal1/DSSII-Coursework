import API from './api.js'; 

const pageSize = 9;

const createNote = async (noteData) => {
    const response = await API.post('/notes', noteData);
    return response.data;
}

const updateNote = async (id, updatedNoteData) => {
    const response = await API.put(`/notes/${id}`, updatedNoteData);
    return response.data;
}

const deleteNote = async (id) => { 
   const response = await API.delete(`/notes/${id}`);
   return response.status;
}

const getAllNotes = async (page = 1, pageSize) => {
    const response = await API.get(`/notes?page=${page}&pageSize=${pageSize}`);
    return response.data;
}

const searchNotes = async (query, fromDate, toDate, page = 1, pageSize) => {
    const params = new URLSearchParams();
    if (query) params.append("query", query);
    if (fromDate) params.append("fromDate", fromDate);
    if (toDate) params.append("toDate", toDate);
    if (page) params.append("page", page);
    if (pageSize) params.append("pageSize", pageSize);

    const response = await API.get(`/notes/search?${params.toString()}`);
    return response.data;
}


const noteService = {
   createNote,
   updateNote,
   deleteNote,
   getAllNotes,
   searchNotes
};

export default noteService;