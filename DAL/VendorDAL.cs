using COMMON;
using Dapper;
using INTERFACE;
using MODEL;
using System.Data;
using System.Data.SqlClient;
using System.Reflection;

namespace DAL
{
    public class VendorDAL : IVendorsHelper
    {
        public DataSet ExecuteVendor(VendorModel model)
        {
            DataSet ds = new DataSet();
            try
            {
                using (SqlConnection con = new SqlConnection(ClsCommon.ConnectionString()))
                {
                    SqlCommand cmd = new SqlCommand("Spu_SetVendor", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Mode", model.Mode);
                    cmd.Parameters.AddWithValue("@ID", model.ID);
                    cmd.Parameters.AddWithValue("@FirmName", model.FirmName);
                    cmd.Parameters.AddWithValue("@FirmTypeID", model.FirmTypeID);
                    cmd.Parameters.AddWithValue("@GSTNumber", model.GSTNumber);
                    cmd.Parameters.AddWithValue("@GSTRegDate", model.GSTRegDate);
                    cmd.Parameters.AddWithValue("@OwnerName", model.OwnerName);
                    cmd.Parameters.AddWithValue("@Address", model.Address);
                    cmd.Parameters.AddWithValue("@FactoryAddress", model.FactoryAddress);
                    cmd.Parameters.AddWithValue("@ServiceableStateID", model.ServiceableStateID);
                    cmd.Parameters.AddWithValue("@BrandingTypeID", model.BrandingTypeID);
                    cmd.Parameters.AddWithValue("@ManagerDetails", model.ManagerDetails);
                    cmd.Parameters.AddWithValue("@ContactNumber", model.ContactNumber);
                    cmd.Parameters.AddWithValue("@City", model.City);
                    cmd.Parameters.AddWithValue("@PinCode", model.PinCode);
                    cmd.Parameters.AddWithValue("@Latitude", model.Latitude);
                    cmd.Parameters.AddWithValue("@Longitude", model.Longitude);
                    cmd.Parameters.AddWithValue("@NameAsPerBank", model.NameAsPerBank);
                    cmd.Parameters.AddWithValue("@AccountNumber", model.AccountNumber);
                    cmd.Parameters.AddWithValue("@IFSC", model.IFSC);
                    cmd.Parameters.AddWithValue("@BankBranch", model.BankBranch);
                    cmd.Parameters.AddWithValue("@MSMENumber", model.MSMENumber);
                    cmd.Parameters.AddWithValue("@RouteNumber", model.RouteNumber);
                    cmd.Parameters.AddWithValue("@RouteType", model.RouteType);
                    cmd.Parameters.AddWithValue("@IsTermsConditionChecked", model.IsTermsConditionChecked);
                    if (model.VendorID != null)
                        cmd.Parameters.AddWithValue("@VendorID", string.Join(",", model.VendorID));
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
    }
}
