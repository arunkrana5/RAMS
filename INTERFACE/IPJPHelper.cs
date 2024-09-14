using MODEL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace INTERFACE
{
    public interface IPJPHelper
    {
        DataSet ExecutePJPPlan(PJPPlanModel model);
    }
}
