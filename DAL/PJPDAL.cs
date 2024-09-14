using COMMON;
using INTERFACE;
using MODEL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class PJPDAL:IPJPHelper
    {
        public DataSet ExecutePJPPlan(PJPPlanModel obj)
        {
            DataSet ds = new DataSet();
            try
            {
                using (SqlConnection con = new SqlConnection(ClsCommon.ConnectionString()))
                {
                    SqlCommand cmd = new SqlCommand(obj.Proc, con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", obj.ID);
                    cmd.Parameters.AddWithValue("@UserID", obj.UserID);
                    cmd.Parameters.AddWithValue("@RouteNumber", obj.RouteNumber);
                    cmd.Parameters.AddWithValue("@VisitDate", obj.VisitDate);
                    cmd.Parameters.AddWithValue("@CreatedBy", obj.CreatedBy);
                    cmd.Parameters.AddWithValue("@IPAddress", obj.IPAddress);
                    if (obj.VendorID != null)
                        cmd.Parameters.AddWithValue("@VendorID", string.Join(",", obj.VendorID));
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
