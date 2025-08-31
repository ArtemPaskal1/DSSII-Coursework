namespace back_end.Models
{
    public class Register
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
        public required string RepeatPassword { get; set; }
    }
}
