using back_end.DTO;

namespace back_end.IServices
{
    public interface IAuthService
    {
        Task<AuthResponseDTO?> RegisterAsync(RegisterDTO registerDTO);
        Task<AuthResponseDTO?> LoginAsync(LoginDTO loginDTO);
    }
}
