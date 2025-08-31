using System.ComponentModel.DataAnnotations;

namespace back_end.DTO
{
    public class RegisterDTO
    {
        [Required(ErrorMessage = "Username is required")]
        [MinLength(3, ErrorMessage = "Username must be at least 3 characters")]
        public string Username { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password is required")]
        [MinLength(6, ErrorMessage = "Password must be at least 6 characters")]
        public string Password { get; set; } = string.Empty;

        [Required(ErrorMessage = "Repeat password is required")]
        [Compare("Password", ErrorMessage = "Passwords do not match")]
        public string RepeatPassword { get; set; } = string.Empty;
    }
}
