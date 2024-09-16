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
        public static string EntrySource = "Web";
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
        public static List<ConfigSetting> GetConfigSetting(GetResponse modal)
        {
            List<ConfigSetting> result = new List<ConfigSetting>();
            try
            {
                using (IDbConnection DBContext = new SqlConnection(ClsCommon.ConnectionString()))
                {
                    var param = new DynamicParameters();
                    param.Add("@ConfigKey", dbType: DbType.String, value: modal.Doctype ?? "", direction: ParameterDirection.Input);
                    DBContext.Open();
                    using (var reader = DBContext.QueryMultiple("spu_GetConfigSetting", param: param, commandType: CommandType.StoredProcedure))
                    {
                        result = reader.Read<ConfigSetting>().ToList();
                    }
                    DBContext.Close();
                }
            }
            catch (Exception ex)
            {
                Common_SPU.LogError("Error during GetConfigSetting. The query was executed :", ex.ToString(), "spu_GetConfigSetting()", "Common_SPU", "Common_SPU", modal.LoginID, modal.IPAddress);

            }
            return result;
        }
        public static PostResponse fnSetMasterAttachment(FileResponse Modal)
        {
            PostResponse result = new PostResponse();

            using (SqlConnection con = new SqlConnection(ClsCommon.ConnectionString()))
            {
                try
                {
                    con.Open();
                    using (SqlCommand command = new SqlCommand(Modal.Proc, con))
                    {
                        SqlDataAdapter da = new SqlDataAdapter();
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.Add("@ID", SqlDbType.Int).Value = Modal.ID ?? 0;
                        command.Parameters.Add("@filename", SqlDbType.VarChar).Value = Modal.FileName ?? "";
                        command.Parameters.Add("@contenttype", SqlDbType.VarChar).Value = Modal.FileExt ?? "";
                        command.Parameters.Add("@tableid", SqlDbType.Int).Value = Modal.tableid ?? 0;
                        command.Parameters.Add("@TableName", SqlDbType.VarChar).Value = Modal.TableName ?? "";
                        command.Parameters.Add("@Description", SqlDbType.VarChar).Value = Modal.Description ?? "";
                        command.Parameters.Add("@createdby", SqlDbType.Int).Value = Modal.LoginID;
                        command.Parameters.Add("@IPAddress", SqlDbType.VarChar).Value = Modal.IPAddress;
                        command.CommandTimeout = 0;
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                result.ID = Convert.ToInt64(reader["RET_ID"]);
                                result.StatusCode = Convert.ToInt32(reader["STATUS"]);
                                result.SuccessMessage = reader["MESSAGE"].ToString();
                                if (result.StatusCode > 0)
                                {
                                    result.Status = true;
                                }
                            }
                        }

                    }
                    con.Close();
                }
                catch (Exception ex)
                {
                    con.Close();
                    Common_SPU.LogError("Error during fnSetMasterAttachment_SSR. The query was executed :", ex.ToString(), "spu_SetUpdateColumn_Common()", "Common_SPU", "Common_SPU", Modal.LoginID, Modal.IPAddress);
                    result.StatusCode = -1;
                    result.SuccessMessage = ex.Message.ToString();
                }
            }
            return result;

        }
        public static PostResponse fnSetAttendenceLog(MarkAttendence modal)
        {
            PostResponse Result = new PostResponse();
            using (SqlConnection con = new SqlConnection(ClsCommon.ConnectionString()))
            {
                try
                {
                    float Latitude = 0, Longitude = 0;
                    float.TryParse(modal.Latitude, out Latitude);
                    float.TryParse(modal.Longitude, out Longitude);
                    con.Open();
                    using (SqlCommand command = new SqlCommand("spu_SetAttendence_Log", con))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.Add("@Location", SqlDbType.VarChar).Value = modal.Location ?? "";
                        command.Parameters.Add("@Latitude", SqlDbType.Float).Value = Latitude;
                        command.Parameters.Add("@Longitude", SqlDbType.Float).Value = Longitude;
                        command.Parameters.Add("@Error", SqlDbType.VarChar).Value = modal.Error ?? "";
                        command.Parameters.Add("@Notes", SqlDbType.VarChar).Value = modal.Notes ?? "";
                        command.Parameters.Add("@Flag_Doctype", SqlDbType.VarChar).Value = modal.Flag_Doctype ?? "";
                        command.Parameters.Add("@Flag_Reason", SqlDbType.VarChar).Value = modal.Flag_Reason ?? "";
                        command.Parameters.Add("@StatusID", SqlDbType.Int).Value = modal.StatusID;
                        command.Parameters.Add("@AttachmentID", SqlDbType.Int).Value = modal.AttachmentID;
                        command.Parameters.Add("@EMPID", SqlDbType.Int).Value = modal.EMPID;
                        command.Parameters.Add("@IsActive", SqlDbType.Int).Value = 1;
                        command.Parameters.Add("@Priority", SqlDbType.Int).Value = modal.Priority;
                        command.Parameters.Add("@createdby", SqlDbType.Int).Value = modal.LoginID;
                        command.Parameters.Add("@IPAddress", SqlDbType.VarChar).Value = modal.IPAddress;
                        command.Parameters.Add("@EntrySource", SqlDbType.VarChar).Value = EntrySource;
                        command.CommandTimeout = 0;
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                Result.ID = Convert.ToInt64(reader["RET_ID"]);
                                Result.StatusCode = Convert.ToInt32(reader["StatusCode"]);
                                Result.Status = Convert.ToBoolean(reader["STATUS"]);
                                Result.SuccessMessage = reader["MESSAGE"].ToString();
                                Result.AdditionalMessage = reader["AdditionalMessage"].ToString();
                            }
                        }

                    }
                    con.Close();
                }
                catch (Exception ex)
                {
                    con.Close();
                    Result.StatusCode = -1;
                    Result.SuccessMessage = ex.Message.ToString();
                }
            }
            return Result;
        }
    }
}
