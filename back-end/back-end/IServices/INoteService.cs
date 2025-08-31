using back_end.DTO;
using back_end.Models;
using System;
using System.Threading.Tasks;

namespace back_end.IServices
{
    public interface INoteService
    {
        Task<NoteDTO> CreateNoteAsync(string userId, CreateNoteDTO noteDTO);
        Task<bool> UpdateNoteAsync(string userId, UpdateNoteDTO noteDTO);
        Task<bool> DeleteNoteAsync(string userId, int noteId);
        Task<NoteList<NoteDTO>> GetNotesAsync(string userId, int page, int pageSize);
        Task<NoteList<NoteDTO>> SearchNotesAsync(
            string userId, 
            string? query, 
            DateTime? fromDate, 
            DateTime? toDate, 
            int page, 
            int pageSize
        );
    }
}
