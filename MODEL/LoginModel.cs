using System.ComponentModel.DataAnnotations;

namespace MODEL
{
    public class LoginModel:BaseModel
    {
        [Required(ErrorMessage = "User Name Can't Be Blank")]
        public string UserName { get; set; }
        [Required(ErrorMessage = "Password Can't Be Blank")]
        public string Password { get; set; }
        public string? IPAddress { get; set; }
        public string? SessionID { get; set; }
        public string grant_type { get; set; }
        public string? LoginInfo { get; set; }

        public bool RememberMe { get; set; }
        public LoginModel()
        {
            grant_type = "password";
        }
    }
}
