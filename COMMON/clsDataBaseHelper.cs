using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;

namespace COMMON
{
    public class clsDataBaseHelper
    { 
        public static DataSet ExecuteDataSet(string sql)
        {
            DataSet ds = new DataSet();
            SqlDataAdapter da;
            da = new SqlDataAdapter(sql, ClsCommon.ConnectionString());
            da.SelectCommand.CommandTimeout = 120;
            da.Fill(ds);
            return ds;
        }
        public static DataSet ExecuteDataSet(string sql, SqlParameter[] @params)
        {
            DataSet ds = new DataSet();
            SqlDataAdapter da = new SqlDataAdapter(sql, ClsCommon.ConnectionString());
            da.SelectCommand.CommandType = CommandType.StoredProcedure;
            da.SelectCommand.CommandTimeout = 200;
            for (int i = 0; i <= @params.Length - 1; i++)
            {
                da.SelectCommand.Parameters.AddWithValue(@params[i].ParameterName, @params[i].Value);
            }
            da.Fill(ds);
            return ds;

        }
    }
}
