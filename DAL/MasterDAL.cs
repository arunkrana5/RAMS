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
    }
}
