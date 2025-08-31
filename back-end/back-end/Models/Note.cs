using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace back_end.Models
{
    public class Note
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }

        [Required]
        [ForeignKey("UserId")]
        public string UserId { get; set; } = string.Empty;

        [Required]
        public DateTime CreatedAt { get; init; }
    }
}
