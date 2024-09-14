using Dapper;
using MODEL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static MODEL.CommonModel;

namespace COMMON
{
    public class Common_SPU
    {
        public static void LogError(string ErrDescription, string SystemException, string ActiveFunction, string ActiveForm, string ActiveModule, long LoginID, string IPAddress)
        {
            try
            {
                SqlParameter[] oparam = new SqlParameter[7];
                oparam[0] = new SqlParameter("@ErrDescription", ClsCommon.EnsureString(ErrDescription));
                oparam[1] = new SqlParameter("@SystemException", ClsCommon.EnsureString(SystemException));
                oparam[2] = new SqlParameter("@ActiveFunction", ClsCommon.EnsureString(ActiveFunction));
                oparam[3] = new SqlParameter("@ActiveForm", ClsCommon.EnsureString(ActiveForm));
                oparam[4] = new SqlParameter("@ActiveModule", ClsCommon.EnsureString(ActiveModule));
                oparam[5] = new SqlParameter("@createdby", LoginID);
                oparam[6] = new SqlParameter("@IPAddress", IPAddress ?? "");
                DataSet ds = clsDataBaseHelper.ExecuteDataSet("spu_SetErrorLog", oparam);
            }
            catch (Exception ex)
            {
            }

        }
        public static List<CommonModel.DropDownlist> GetDropDownList(CommonModel.GetDropDownResponse modal)
        {
            List<CommonModel.DropDownlist> result = new List<CommonModel.DropDownlist>();
            try
            {
                using (IDbConnection DBContext = new SqlConnection(ClsCommon.ConnectionString()))
                {
                    var param = new DynamicParameters();
                    param.Add("@Doctype", dbType: DbType.String, value: modal.Doctype ?? "", direction: ParameterDirection.Input);
                    param.Add("@Values", dbType: DbType.String, value: modal.Values ?? "", direction: ParameterDirection.Input);
                    //param.Add("@LoginId", dbType: DbType.Int32, value: modal.LoginID, direction: ParameterDirection.Input);
                    DBContext.Open();
                    using (var reader = DBContext.QueryMultiple("spu_GetDropDownList", param: param, commandType: CommandType.StoredProcedure))
                    {
                        result = reader.Read<CommonModel.DropDownlist>().ToList();
                    }
                    DBContext.Close();
                }
            }
            catch (Exception ex)
            {
                Common_SPU.LogError("Error during GetDropDownList. The query was executed :", ex.ToString(), "spu_GetDropDownList()", "Common_SPU", "Common_SPU", modal.LoginID, modal.IPAddress);

            }
            return result;
        }
        public static List<DropDownlist> GetAttendenceStatus(GetResponse modal)
        {
            List<DropDownlist> result = new List<DropDownlist>();
            try
            {
                using (IDbConnection DBContext = new SqlConnection(ClsCommon.ConnectionString()))
                {
                    var param = new DynamicParameters();
                    param.Add("@ID", dbType: DbType.Int32, value: modal.ID, direction: ParameterDirection.Input);
                    param.Add("@Doctype", dbType: DbType.String, value: modal.Doctype ?? "", direction: ParameterDirection.Input);
                    param.Add("@LoginId", dbType: DbType.Int32, value: modal.LoginID, direction: ParameterDirection.Input);
                    DBContext.Open();
                    using (var reader = DBContext.QueryMultiple("spu_GetAttendenceStatus", param: param, commandType: CommandType.StoredProcedure))
                    {
                        result = reader.Read<DropDownlist>().ToList();
                    }
                    DBContext.Close();
                }
            }
            catch (Exception ex)
            {
                Common_SPU.LogError("Error during GetAttendenceStatus. The query was executed :", ex.ToString(), "spu_GetAttendenceStatus()", "Common_SPU", "Common_SPU", modal.LoginID, modal.IPAddress);

            }
            return result;
        }
    }
}
