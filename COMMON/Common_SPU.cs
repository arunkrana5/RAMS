using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

    }
}
