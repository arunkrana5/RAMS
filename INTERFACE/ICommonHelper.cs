using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static MODEL.CommonModel;

namespace INTERFACE
{
    public interface ICommonHelper
    {
        DataSet ChangeStatus(ChangeStatusModel statusModel);
    }
}
