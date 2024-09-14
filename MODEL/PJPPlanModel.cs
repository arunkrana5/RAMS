using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class PJPPlanModel : BaseModel
    {
        public int UserID { get; set; }
        public string? RouteNumber { get; set; }
        public int[]? VendorID { get; set; }
        public string? VisitDate { get; set; }
    }
}
