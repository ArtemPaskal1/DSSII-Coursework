using System;
using System.ComponentModel.DataAnnotations;

namespace back_end.DTO
{
    public class NoteDTO
    {
        public int Id { get; set; }

        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }

        public DateTime CreatedAt { get; set; }
    }

    public class CreateNoteDTO
    {
        [Required(ErrorMessage = "Title is required")]
        [MinLength(1, ErrorMessage = "Title must be at least 1 character")]
        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }
    }

    public class UpdateNoteDTO
    {
        [Required]
        public int Id { get; set; }

        [Required(ErrorMessage = "Title is required")]
        [MinLength(1, ErrorMessage = "Title must be at least 1 character")]
        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }
    }
}
