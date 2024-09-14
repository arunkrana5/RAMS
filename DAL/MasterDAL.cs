using COMMON;
using INTERFACE;
using MODEL;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;
using static MODEL.CommonModel;
using System.Net;

namespace DAL
{
    public class MasterDAL : IMastersHelper
    {
        public DataSet ExecuteMaster(MasterModel model)
        {
            DataSet ds = new DataSet();
            try
            {
                using (SqlConnection con = new SqlConnection(ClsCommon.ConnectionString()))
                {
                    SqlCommand cmd = new SqlCommand(model.Proc, con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@MasterID", model.ID);
                    cmd.Parameters.AddWithValue("@TableName", model.TableName);
                    cmd.Parameters.AddWithValue("@Value", model.Code);
                    cmd.Parameters.AddWithValue("@Name", model.Name);
                    cmd.Parameters.AddWithValue("@Priority", model.Priority);
                    cmd.Parameters.AddWithValue("@GroupID", model.GroupID);
                    cmd.Parameters.AddWithValue("@IsActive", model.IsActive);
                    cmd.Parameters.AddWithValue("@CreatedBy", model.CreatedBy);
                    cmd.Parameters.AddWithValue("@IPAddress", model.IPAddress);
                    if (con.State == ConnectionState.Open)
                        con.Close();
                    con.Open();
                    SqlDataAdapter sda = new SqlDataAdapter(cmd);
                    sda.Fill(ds);
                }
            }
            catch (Exception)
            {
                ds = null;
            }
            return ds;
        }

        public DataSet ExecuteUsers(UserModel model)
        {
            DataSet ds = new DataSet();
            try
            {
                using (SqlConnection con = new SqlConnection(ClsCommon.ConnectionString()))
                {
                    SqlCommand cmd = new SqlCommand(model.Proc, con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@EMPID", model.ID);
                    cmd.Parameters.AddWithValue("@LoginID", model.LoginID);
                    cmd.Parameters.AddWithValue("@EMPCode", model.EmployeeCode);
                    cmd.Parameters.AddWithValue("@EMPName", model.EmployeeName);
                    cmd.Parameters.AddWithValue("@UserID", model.UserName);
                    cmd.Parameters.AddWithValue("@Password", model.Password);
                    cmd.Parameters.AddWithValue("@RoleID", model.RoleID);
                    cmd.Parameters.AddWithValue("@DealerID", model.DealerID);
                    cmd.Parameters.AddWithValue("@FatherName", model.FatherName);
                    cmd.Parameters.AddWithValue("@DOB", model.DOB);
                    cmd.Parameters.AddWithValue("@Gender", model.Gender);
                    cmd.Parameters.AddWithValue("@DesignID", model.DesignationID);
                    cmd.Parameters.AddWithValue("@DepartID", model.DepartmentID);
                    cmd.Parameters.AddWithValue("@DOJ", model.DOJ);
                    cmd.Parameters.AddWithValue("@PAN", model.PAN);
                    cmd.Parameters.AddWithValue("@EmailID", model.EmailID);
                    cmd.Parameters.AddWithValue("@Phone", model.Phone);
                    cmd.Parameters.AddWithValue("@UAN", model.UAN);
                    cmd.Parameters.AddWithValue("@ESIC", model.ESIC);
                    cmd.Parameters.AddWithValue("@IsPJPAutoAssign", model.IsPJPAutoAssign);
                    cmd.Parameters.AddWithValue("@CountryID", model.CountryID);
                    cmd.Parameters.AddWithValue("@RegionID", model.RegionID);
                    cmd.Parameters.AddWithValue("@StateID", model.StateID);
                    cmd.Parameters.AddWithValue("@CityID", model.CityID);
                    cmd.Parameters.AddWithValue("@Location", model.Location);
                    cmd.Parameters.AddWithValue("@Zipcode", model.PinCode);
                    cmd.Parameters.AddWithValue("@Address1", model.AddressLine1);
                    cmd.Parameters.AddWithValue("@Address2", model.AddressLine2);
                    cmd.Parameters.AddWithValue("@BankBranch", model.BranchName);
                    cmd.Parameters.AddWithValue("@BankName", model.BankName);
                    cmd.Parameters.AddWithValue("@AccountNo", model.AccountNumber);
                    cmd.Parameters.AddWithValue("@IFSCCode", model.IFSC);
                    cmd.Parameters.AddWithValue("@CreatedBy", model.CreatedBy);
                    cmd.Parameters.AddWithValue("@IPAddress", model.IPAddress);
                    cmd.Parameters.AddWithValue("@AttachID", 0);
                    cmd.Parameters.AddWithValue("@IsActive", 1);
                    cmd.Parameters.AddWithValue("@Priority", 0);
                    cmd.Parameters.AddWithValue("@PaymentMode", "NA");
                    if (con.State == ConnectionState.Open)
                        con.Close();
                    con.Open();
                    SqlDataAdapter sda = new SqlDataAdapter(cmd);
                    sda.Fill(ds);
                }
            }
            catch (Exception ex)
            {
                ds = null;
            }
            return ds;
        }

        public DataSet ExecuteBrandingType(BrandingTypeModel model)
        {
            DataSet ds = new DataSet();
            try
            {
                using (SqlConnection con = new SqlConnection(ClsCommon.ConnectionString()))
                {
                    SqlCommand cmd = new SqlCommand(model.Proc, con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", model.ID);
                    cmd.Parameters.AddWithValue("@Code", model.Code);
                    cmd.Parameters.AddWithValue("@Name", model.Name);
                    cmd.Parameters.AddWithValue("@Specification", model.Specification);
                    cmd.Parameters.AddWithValue("@Rate", model.Rate);
                    cmd.Parameters.AddWithValue("@Priority", model.Priority);
                    cmd.Parameters.AddWithValue("@CreatedBy", model.CreatedBy);
                    cmd.Parameters.AddWithValue("@IPAddress", model.IPAddress);
                    if (con.State == ConnectionState.Open)
                        con.Close();
                    con.Open();
                    SqlDataAdapter sda = new SqlDataAdapter(cmd);
                    sda.Fill(ds);
                }
            }
            catch (Exception)
            {
                ds = null;
            }
            return ds;
        }

        public DataSet GetEMP(GetResponse model)
        {
            DataSet ds = new DataSet();
            try
            {
                using (SqlConnection con = new SqlConnection(ClsCommon.ConnectionString()))
                {
                    SqlCommand cmd = new SqlCommand(model.Proc, con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@EMPID", model.ID);
                    cmd.Parameters.AddWithValue("@LoginID", model.LoginID);
                    if (con.State == ConnectionState.Open)
                        con.Close();
                    con.Open();
                    SqlDataAdapter sda = new SqlDataAdapter(cmd);
                    sda.Fill(ds);
                }
            }
            catch (Exception)
            {
                ds = null;
            }
            return ds;
        }

        public List<EmployeeModel> GetEmployeeList(DataTableModel model)
        {
            List<EmployeeModel> list = new List<EmployeeModel>();
            try
            {
                using (IDbConnection DBContext = new SqlConnection(ClsCommon.ConnectionString()))
                {
                    int commandTimeout = 0;
                    var param = new DynamicParameters();
                    param.Add("@start", dbType: DbType.Int32, value: model.start);
                    param.Add("@length ", dbType: DbType.Int32, value: model.length);
                    param.Add("@SearchText", dbType: DbType.String, value: model.SearchText);
                    param.Add("@sortColumn", dbType: DbType.Int32, value: model.sortColumn);
                    param.Add("@sortOrder", dbType: DbType.String, value: model.sortOrder);
                    param.Add("@LoginID", dbType: DbType.Int64, value: model.LoginID, direction: ParameterDirection.Input);
                    DBContext.Open();
                    using (var reader = DBContext.QueryMultiple("spu_GetEmployeeList", param: param, commandType: CommandType.StoredProcedure, commandTimeout: commandTimeout))
                    {
                        list = reader.Read<EmployeeModel>().ToList();
                    }

                    DBContext.Close();
                }
            }
            catch (Exception ex)
            {
                Common_SPU.LogError(ex.Message.ToString(), ex.ToString(), "spu_GetEmployeeList", "spu_GetEmployeeList", "DataModal", model.LoginID, model.IPAddress);
            }
            return list;
        }

        public PostResponse fnSetDealer(DealerModel.Add model)
        {
            PostResponse Result = new PostResponse();
            using (SqlConnection con = new SqlConnection(ClsCommon.ConnectionString()))
            {
                try
                {
                    con.Open();
                    using (SqlCommand command = new SqlCommand("spu_SetDealer", con))
                    {
                        SqlDataAdapter da = new SqlDataAdapter();
                        command.CommandType = CommandType.StoredProcedure;

                        command.Parameters.Add("@DealerID", SqlDbType.Int).Value = model.DealerID;
                        command.Parameters.Add("@DealerCode", SqlDbType.VarChar).Value = model.DealerCode ?? "";
                        command.Parameters.Add("@DealerName", SqlDbType.VarChar).Value = model.DealerName ?? "";
                        command.Parameters.Add("@EmailID", SqlDbType.VarChar).Value = model.EmailID ?? "";
                        command.Parameters.Add("@Phone", SqlDbType.VarChar).Value = model.Phone ?? "";
                        command.Parameters.Add("@Address", SqlDbType.VarChar).Value = model.Address ?? "";
                        command.Parameters.Add("@DealerTypeID", SqlDbType.VarChar).Value = model.DealerTypeID;
                        command.Parameters.Add("@DealerCategoryID", SqlDbType.Int).Value = model.DealerCategoryID;
                        command.Parameters.Add("@StateID", SqlDbType.Int).Value = model.StateID;
                        command.Parameters.Add("@BranchID", SqlDbType.Int).Value = model.BranchID;
                        command.Parameters.Add("@CityID", SqlDbType.Int).Value = model.CityID;
                        command.Parameters.Add("@AreaID", SqlDbType.Int).Value = model.AreaID;
                        command.Parameters.Add("@RegionID", SqlDbType.Int).Value = model.RegionID;
                        command.Parameters.Add("@PinCode", SqlDbType.VarChar).Value = model.PinCode ?? "";
                        command.Parameters.Add("@Latitude", SqlDbType.VarChar).Value = model.Latitude ?? "";
                        command.Parameters.Add("@Longitude", SqlDbType.VarChar).Value = model.Longitude ?? "";
                        command.Parameters.Add("@BillingCode", SqlDbType.VarChar).Value = model.BillingCode ?? "";
                        command.Parameters.Add("@BillingName", SqlDbType.VarChar).Value = model.BillingName ?? "";
                        command.Parameters.Add("@IsActive", SqlDbType.Int).Value = 1;
                        command.Parameters.Add("@Priority", SqlDbType.Int).Value = model.Priority;
                        command.Parameters.Add("@createdby", SqlDbType.Int).Value = model.LoginID;
                        command.Parameters.Add("@IPAddress", SqlDbType.VarChar).Value = model.IPAddress;
                        command.CommandTimeout = 0;
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                Result.ID = Convert.ToInt64(reader["RET_ID"]);
                                Result.StatusCode = Convert.ToInt32(reader["STATUS"]);
                                Result.SuccessMessage = reader["MESSAGE"].ToString();
                                if (Result.StatusCode > 0)
                                {
                                    Result.Status = true;
                                }
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
        public PostResponse fnSetDealerMapping(DealerModel.Add model)
        {
            PostResponse Result = new PostResponse();
            using (SqlConnection con = new SqlConnection(ClsCommon.ConnectionString()))
            {
                try
                {
                    con.Open();
                    using (SqlCommand command = new SqlCommand("spu_SetDealer_Mapping", con))
                    {
                        SqlDataAdapter da = new SqlDataAdapter();
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.Add("@DealerID", SqlDbType.Int).Value = model.DealerID;
                        command.Parameters.Add("@UserIDs", SqlDbType.VarChar).Value = String.Join(",",model.UserID);
                        command.Parameters.Add("@RSMIDs", SqlDbType.VarChar).Value = model.RSM ?? "";
                        command.Parameters.Add("@BSMIDs", SqlDbType.VarChar).Value = model.BSM ?? "";
                        command.Parameters.Add("@ASMIDs", SqlDbType.VarChar).Value = model.ASM ?? "";
                        command.Parameters.Add("@TLIDs", SqlDbType.VarChar).Value = model.TL ?? "";
                        command.Parameters.Add("@RMMIDs", SqlDbType.VarChar).Value = model.RMM ?? "";
                        command.Parameters.Add("@BMMIDs", SqlDbType.VarChar).Value = model.BMM ?? "";
                        command.Parameters.Add("@InhouseIDs", SqlDbType.VarChar).Value = model.Inhouse ?? "";
                        command.Parameters.Add("@OthersIDs", SqlDbType.VarChar).Value = model.Others ?? "";
                        command.Parameters.Add("@createdby", SqlDbType.Int).Value = model.LoginID;
                        command.Parameters.Add("@IPAddress", SqlDbType.VarChar).Value = model.IPAddress;
                        command.CommandTimeout = 0;
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                Result.ID = Convert.ToInt64(reader["RET_ID"]);
                                Result.StatusCode = Convert.ToInt32(reader["STATUS"]);
                                Result.SuccessMessage = reader["MESSAGE"].ToString();
                                if (Result.StatusCode > 0)
                                {
                                    Result.Status = true;
                                }
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
        public List<DealerModel.List> GetDealerList(DataTableModel Modal)
        {

            List<DealerModel.List> result = new List<DealerModel.List>();
            try
            {
                using (IDbConnection DBContext = new SqlConnection(ClsCommon.ConnectionString()))
                {
                    int commandTimeout = 0;
                    var param = new DynamicParameters();

                    param.Add("@start", dbType: DbType.Int32, value: Modal.start);
                    param.Add("@length ", dbType: DbType.Int32, value: Modal.length);
                    param.Add("@SearchText", dbType: DbType.String, value: Modal.SearchText);
                    param.Add("@sortColumn", dbType: DbType.Int32, value: Modal.sortColumn);
                    param.Add("@sortOrder", dbType: DbType.String, value: Modal.sortOrder);
                    param.Add("@LoginID", dbType: DbType.Int64, value: Modal.LoginID, direction: ParameterDirection.Input);
                    DBContext.Open();
                    using (var reader = DBContext.QueryMultiple("spu_GetDealerList", param: param, commandType: CommandType.StoredProcedure, commandTimeout: commandTimeout))
                    {
                        result = reader.Read<DealerModel.List>().ToList();
                    }

                    DBContext.Close();
                }
            }
            catch (Exception ex)
            {
                Common_SPU.LogError(ex.Message.ToString(), ex.ToString(), "GetDealerList", "spu_GetDealerList", "DataModal", Modal.LoginID, Modal.IPAddress);
            }
            return result;
        }
        public DealerModel.Add GetDealer(GetResponse Modal)
        {

            DealerModel.Add result = new DealerModel.Add();
            try
            {
                using (IDbConnection DBContext = new SqlConnection(ClsCommon.ConnectionString()))
                {
                    int commandTimeout = 0;
                    var param = new DynamicParameters();
                    param.Add("@DealerID", dbType: DbType.Int64, value: Modal.ID, direction: ParameterDirection.Input);
                    param.Add("@LoginID", dbType: DbType.Int64, value: Modal.LoginID, direction: ParameterDirection.Input);
                    DBContext.Open();
                    using (var reader = DBContext.QueryMultiple("spu_GetDealer", param: param, commandType: CommandType.StoredProcedure, commandTimeout: commandTimeout))
                    {
                        result = reader.Read<DealerModel.Add>().FirstOrDefault();
                        if (result == null)
                        {
                            result = new DealerModel.Add();
                        }
                        if (!reader.IsConsumed)
                        {
                            var Mapping = reader.Read<DropDownlist>().ToList();
                            if (Mapping.Count > 0)
                            {
                                string doctype = "Employee";
                                if (Mapping.Where(x => x.Name == doctype).Select(x => x.ID).ToList().Count() > 0)
                                {
                                    result.EMP = string.Join(",", Mapping.Where(x => x.Name == doctype).Select(x => x.ID).ToList());
                                //}
                                //doctype = "RSM";
                                //if (Mapping.Where(x => x.Name == doctype).Select(x => x.ID).ToList().Count() > 0)
                                //{
                                //    result.RSM = string.Join(",", Mapping.Where(x => x.Name == doctype).Select(x => x.ID).ToList());
                                //}
                                //doctype = "BSM";
                                //if (Mapping.Where(x => x.Name == doctype).Select(x => x.ID).ToList().Count() > 0)
                                //{
                                //    result.BSM = string.Join(",", Mapping.Where(x => x.Name == doctype).Select(x => x.ID).ToList());
                                //}
                                //doctype = "ASM";
                                //if (Mapping.Where(x => x.Name == doctype).Select(x => x.ID).ToList().Count() > 0)
                                //{
                                //    result.ASM = string.Join(",", Mapping.Where(x => x.Name == doctype).Select(x => x.ID).ToList());
                                //}
                                //doctype = "TL";
                                //if (Mapping.Where(x => x.Name == doctype).Select(x => x.ID).ToList().Count() > 0)
                                //{
                                //    result.TL = string.Join(",", Mapping.Where(x => x.Name == doctype).Select(x => x.ID).ToList());
                                //}
                                //doctype = "RMM";
                                //if (Mapping.Where(x => x.Name == doctype).Select(x => x.ID).ToList().Count() > 0)
                                //{
                                //    result.RMM = string.Join(",", Mapping.Where(x => x.Name == doctype).Select(x => x.ID).ToList());
                                //}
                                //doctype = "BMM";
                                //if (Mapping.Where(x => x.Name == doctype).Select(x => x.ID).ToList().Count() > 0)
                                //{
                                //    result.BMM = string.Join(",", Mapping.Where(x => x.Name == doctype).Select(x => x.ID).ToList());
                                //}
                                //doctype = "Inhouse";
                                //if (Mapping.Where(x => x.Name == doctype).Select(x => x.ID).ToList().Count() > 0)
                                //{
                                //    result.Inhouse = string.Join(",", Mapping.Where(x => x.Name == doctype).Select(x => x.ID).ToList());
                                //}
                                //doctype = "Others";
                                //if (Mapping.Where(x => x.Name == doctype).Select(x => x.ID).ToList().Count() > 0)
                                //{
                                //    result.Others = string.Join(",", Mapping.Where(x => x.Name == doctype).Select(x => x.ID).ToList());
                                //}

                            }

                        }
                        //if (!reader.IsConsumed)
                        //{
                        //    result.RegionList = reader.Read<DropDownlist>().ToList();

                        //}
                        //if (!reader.IsConsumed)
                        //{

                        //    result.StateList = reader.Read<DropDownlist>().ToList();

                        //}
                        //if (!reader.IsConsumed)
                        //{

                        //    result.CityList = reader.Read<DropDownlist>().ToList();
                        //}
                        //if (!reader.IsConsumed)
                        //{

                        //    result.AreaList = reader.Read<DropDownlist>().ToList();
                        //}
                        //if (!reader.IsConsumed)
                        //{

                        //    result.BranchList = reader.Read<DropDownlist>().ToList();
                        //}
                        //if (!reader.IsConsumed)
                        //{

                        //    result.DealerCategoryList = reader.Read<DropDownlist>().ToList();
                        //}
                        //if (!reader.IsConsumed)
                        //{

                        //    result.DealerTypeList = reader.Read<DropDownlist>().ToList();
                        //}
                        //if (!reader.IsConsumed)
                        //{

                        //    var AllList = reader.Read<DropDownlist>().ToList();
                        //    if (AllList != null)
                        //    {
                        //        result.NSMList = AllList.Where(x => x.Other == "NSM").ToList();
                        //        if (result.NSMList == null)
                        //        {
                        //            result.NSMList = new List<DropDownlist>();
                        //        }
                        //        result.RSMList = AllList.Where(x => x.Other == "RSM").ToList();
                        //        if (result.RSMList == null)
                        //        {
                        //            result.RSMList = new List<DropDownlist>();
                        //        }
                        //        result.BSMList = AllList.Where(x => x.Other == "BSM").ToList();
                        //        if (result.BSMList == null)
                        //        {
                        //            result.BSMList = new List<DropDownlist>();
                        //        }
                        //        result.ASMList = AllList.Where(x => x.Other == "ASM").ToList();
                        //        if (result.ASMList == null)
                        //        {
                        //            result.ASMList = new List<DropDownlist>();
                        //        }
                        //        result.TLList = AllList.Where(x => x.Other == "TL").ToList();
                        //        if (result.TLList == null)
                        //        {
                        //            result.TLList = new List<DropDownlist>();
                        //        }
                        //        result.RMMList = AllList.Where(x => x.Other == "RMM").ToList();
                        //        if (result.RMMList == null)
                        //        {
                        //            result.RMMList = new List<DropDownlist>();
                        //        }
                        //        result.BMMList = AllList.Where(x => x.Other == "BMM").ToList();
                        //        if (result.BMMList == null)
                        //        {
                        //            result.BMMList = new List<DropDownlist>();
                        //        }
                        //        result.InhouseList = AllList.Where(x => x.Other == "Inhouse").ToList();
                        //        if (result.InhouseList == null)
                        //        {
                        //            result.InhouseList = new List<DropDownlist>();
                        //        }
                        //        result.OtherList = AllList.Where(x => x.Other == "Others").ToList();
                        //        if (result.OtherList == null)
                        //        {
                        //            result.OtherList = new List<DropDownlist>();
                        //        }
                        //    }
                        //    else
                        //    {
                        //        result.NSMList = new List<DropDownlist>();
                        //        result.RSMList = new List<DropDownlist>();
                        //        result.BSMList = new List<DropDownlist>();
                        //        result.ASMList = new List<DropDownlist>();
                        //        result.TLList = new List<DropDownlist>();
                        //        result.RMMList = new List<DropDownlist>();
                        //        result.BMMList = new List<DropDownlist>();
                        //        result.InhouseList = new List<DropDownlist>();
                        //    }
                        }
                    }

                    DBContext.Close();
                }
            }
            catch (Exception ex)
            {
                Common_SPU.LogError(ex.Message.ToString(), ex.ToString(), "spu_GetDealer", "spu_GetDealer", "DataModal", Modal.LoginID, Modal.IPAddress);
            }
            return result;
        }
    }
}
