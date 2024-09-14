using COMMON;
using Dapper;
using INTERFACE;
using MODEL;
using System.Data;
using System.Data.SqlClient;

namespace DAL
{
    public class AccountDAL:IAccountsHelper
    {
        string EntrySource = "Web";
        public BaseModel GetLogin(LoginModel Model)
        {

            BaseModel result = new BaseModel();
            try
            {
                using (IDbConnection DBContext = new SqlConnection(ClsCommon.ConnectionString()))
                {
                    int commandTimeout = 0;
                    var param = new DynamicParameters();
                    param.Add("@UserID", dbType: DbType.String, value: ClsCommon.EnsureString(Model.UserName), direction: ParameterDirection.Input);
                    param.Add("@Password", dbType: DbType.String, value: ClsCommon.EnsureString(ClsCommon.Encrypt(Model.Password)), direction: ParameterDirection.Input);
                    param.Add("@SessionID", dbType: DbType.String, value: ClsCommon.EnsureString(Model.SessionID), direction: ParameterDirection.Input);
                    param.Add("@IPAddress", dbType: DbType.String, value: ClsCommon.EnsureString(Model.IPAddress), direction: ParameterDirection.Input);
                    param.Add("@LoginInfo", dbType: DbType.String, value: Model.LoginInfo ?? "", direction: ParameterDirection.Input);
                    param.Add("@EntrySource", dbType: DbType.String, value: EntrySource, direction: ParameterDirection.Input);
                    DBContext.Open();
                    using (var reader = DBContext.QueryMultiple("spu_GetLogin", param: param, commandType: CommandType.StoredProcedure, commandTimeout: commandTimeout))
                    {
                        result = reader.Read<BaseModel>().FirstOrDefault();
                    }

                    DBContext.Close();
                }
            }
            catch (Exception ex)
            {
                Common_SPU.LogError(ex.Message.ToString(), ex.ToString(), "spu_GetLogin", "spu_GetLogin", "AccountsModal", 0, "");
            }
            return result;
        }
        public BaseModel GetLoginWithToken(string UserName, string Password, string SessionID, string IPAddress)
        {

            BaseModel result = new BaseModel();
            try
            {
                using (IDbConnection DBContext = new SqlConnection(ClsCommon.ConnectionString()))
                {
                    int commandTimeout = 0;
                    var param = new DynamicParameters();
                    param.Add("@UserName", dbType: DbType.String, value: ClsCommon.EnsureString(UserName), direction: ParameterDirection.Input);
                    param.Add("@Password", dbType: DbType.String, value: ClsCommon.EnsureString(ClsCommon.Encrypt(Password)), direction: ParameterDirection.Input);
                    param.Add("@SessionID", dbType: DbType.String, value: ClsCommon.EnsureString(SessionID), direction: ParameterDirection.Input);
                    param.Add("@IPAddress", dbType: DbType.String, value: ClsCommon.EnsureString(IPAddress), direction: ParameterDirection.Input);
                    DBContext.Open();
                    using (var reader = DBContext.QueryMultiple("spu_GetLogin", param: param, commandType: CommandType.StoredProcedure, commandTimeout: commandTimeout))
                    {
                        result = reader.Read<BaseModel>().FirstOrDefault();
                    }

                    DBContext.Close();
                }
            }
            catch (Exception ex)
            {
                Common_SPU.LogError(ex.Message.ToString(), ex.ToString(), "spu_GetLogin", "spu_GetLogin", "AccountsModal", 0, "");
            }
            return result;
        }
    }
}
