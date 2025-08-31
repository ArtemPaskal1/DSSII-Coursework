using back_end.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using back_end.DTO;

namespace back_end.Controllers
{
    [EnableCors("AllowFrontend")]
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class NotesController : ControllerBase
    {
        private readonly INoteService _noteService;

        public NotesController(INoteService noteService)
        {
            _noteService = noteService;
        }

        [HttpGet]
        public async Task<IActionResult> GetUserNotes([FromQuery] int page = 1, [FromQuery] int pageSize = 9)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var notes = await _noteService.GetNotesAsync(userId!, page, pageSize);
            return Ok(notes);
        }

        [HttpPost]
        public async Task<IActionResult> CreateNote([FromBody] CreateNoteDTO note)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var createdNote = await _noteService.CreateNoteAsync(userId!, note);

            return CreatedAtAction(nameof(GetUserNotes), new { id = createdNote.Id }, createdNote);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateNote(int id, [FromBody] UpdateNoteDTO note)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            note.Id = id;

            var updated = await _noteService.UpdateNoteAsync(userId!, note);
            if (updated)
                return NoContent();

            return NotFound(new { message = "Note not found or not authorized to update." });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNote(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var deleted = await _noteService.DeleteNoteAsync(userId!, id);

            if (deleted)
                return NoContent();

            return NotFound(new { message = "Note not found or not authorized to delete." });
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchNotes(
            [FromQuery] string? query,
            [FromQuery] DateTime? fromDate,
            [FromQuery] DateTime? toDate,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 9)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var notes = await _noteService.SearchNotesAsync(userId!, query, fromDate, toDate, page, pageSize);

            return Ok(notes);
        }
    }
}
