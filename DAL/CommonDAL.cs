using COMMON;
using INTERFACE;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using static MODEL.CommonModel;

namespace DAL
{
    public class CommonDAL:ICommonHelper
    {
        public DataSet ChangeStatus(ChangeStatusModel obj)
        {
            DataSet ds = new DataSet();
            try
            {
                using (SqlConnection con = new SqlConnection(ClsCommon.ConnectionString()))
                {
                    SqlCommand cmd = new SqlCommand("Spu_CommonChangeStatus", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", obj.ID);
                    cmd.Parameters.AddWithValue("@TableName", obj.TableName);
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
