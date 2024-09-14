using MODEL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static MODEL.CommonModel;

namespace INTERFACE
{
    public interface IMastersHelper
    {
        DataSet ExecuteMaster(MasterModel Model);
        DataSet ExecuteUsers(UserModel Model);

        DataSet GetEMP(GetResponse Modal);
        List<EmployeeModel> GetEmployeeList(DataTableModel Model);
        DataSet ExecuteBrandingType(BrandingTypeModel Model);
        PostResponse fnSetDealer(DealerModel.Add model);
        PostResponse fnSetDealerMapping(DealerModel.Add model);
        List<DealerModel.List> GetDealerList(DataTableModel Modal);
        DealerModel.Add GetDealer(GetResponse Modal);
    }
}
