using MODEL;

namespace INTERFACE
{
    public interface IAccountsHelper
    {
        BaseModel GetLogin(LoginModel Model);
        BaseModel GetLoginWithToken(string UserName, string Password, string SessionID, string IPAddress);
    }
}
